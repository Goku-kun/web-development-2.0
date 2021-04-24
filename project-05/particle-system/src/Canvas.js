import React from "react";
import Particle from "./Particle";
import "./Canvas.css";

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mouse: {
                x: undefined,
                y: undefined,
            },
        };
    }

    componentDidMount() {
        var particlesArray = [];
        var canvas = document.querySelector("#canvas1");
        var ctx = canvas.getContext("2d");
        ctx.hue = 0;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener("resize", function (event) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        canvas.addEventListener(
            "click",
            function (event) {
                this.setState(updatePointer);
                for (let i = 0; i < 10; i++) {
                    particlesArray.push(new Particle(event.x, event.y, ctx));
                }

                function updatePointer(prevState, props) {
                    return {
                        mouse: {
                            x: event.x,
                            y: event.y,
                        },
                    };
                }
            }.bind(this)
        );

        canvas.addEventListener(
            "mousemove",
            function (event) {
                this.setState(updatePointer);

                if (event.x % 2 === 0 || event.y % 2 === 0) {
                    particlesArray.push(new Particle(event.x, event.y, ctx));
                }

                function updatePointer(prevState, props) {
                    return {
                        mouse: {
                            x: event.x,
                            y: event.y,
                        },
                    };
                }
            }.bind(this)
        );

        var animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //ctx.fillStyle = "rgba(0,0,0,0.1)";
            //ctx.fillRect(0, 0, canvas.width, canvas.height);
            handleParticle();
            requestAnimationFrame(animate);
        };

        animate();

        function handleParticle() {
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                ctx.hue += 0.5;
                for (let j = i; j < particlesArray.length; j++) {
                    var dx = particlesArray[i].x - particlesArray[j].x;
                    var dy = particlesArray[i].y - particlesArray[j].y;
                    var distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 190) {
                        ctx.beginPath();
                        ctx.strokeStyle = particlesArray[i].color;
                        ctx.lineWidth = particlesArray[i].size / 10;
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }
                if (particlesArray[i].size <= 0.3) {
                    particlesArray.splice(i, 1);
                    i--;
                }
            }
        }
    }
    render() {
        return (
            <div className="Canvas">
                <canvas id="canvas1"></canvas>
                <h1 style={{ color: "red" }}>Hello Here!</h1>
            </div>
        );
    }
}

export default Canvas;

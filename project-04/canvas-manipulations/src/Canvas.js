import React from "react";
import Particles from "./Particles";
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
            handleParticle();
            requestAnimationFrame(animate);
        };

        animate();
        (function init() {
            for (let i = 0; i < 100; i++) {
                particlesArray.push(
                    new Particles(canvas.width, canvas.height, ctx)
                );
            }
        })();

        function handleParticle() {
            for (let particle of particlesArray) {
                particle.update();
                particle.draw();
            }
        }
    }
    render() {
        return (
            <div className="Canvas">
                <canvas id="canvas1"></canvas>
            </div>
        );
    }
}

export default Canvas;

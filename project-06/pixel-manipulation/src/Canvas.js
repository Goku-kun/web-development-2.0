import React from "react";
import "./Canvas.css";

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        var canvas = document.querySelector("#canvas1");
        var ctx = canvas.getContext("2d");
        canvas.width = "400px";
        canvas.height = "300px";

        var image1 = new Image();
        image1.src = "./../public/deku.png";
        ctx.drawImage(image1, 0, 0, canvas.width / 2, canvas.height / 2);

        image1.addEventListener("load", function (event) {
            ctx.drawImage(image1, 0, 0, canvas.width / 2, canvas.height / 2);
        });
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

import React from "react";
import "./Timer.css";
import Toast from "react-bootstrap/Toast";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toTimeString(),
            mount: true,
            visible: true,
        };
        this.tick = this.tick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleToast = this.handleToast.bind(this);
    }

    tick() {
        this.setState({
            time: new Date().toTimeString(),
        });
    }
    componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleToast() {
        this.setState(function (prevState, props) {
            return {
                visible: !prevState.visible,
            };
        });
    }

    handleClick(event) {
        var target = event.target;
        this.setState(changeState);

        event.target.textContent = target.textContent === "Time" ? "Remove" : "Time";

        // *********************************
        function changeState(previousState) {
            return {
                mount: !previousState.mount,
            };
        }
    }
    render() {
        var renderComponent;
        var toast;
        if (this.state.mount) {
            renderComponent = <h1>{this.state.time}</h1>;
        } else {
            renderComponent = <h1>Click button to show time</h1>;
        }

        if (this.state.visible) {
            toast = (
                <Toast onClick={this.handleToast}>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
                </Toast>
            );
        } else {
            toast = (
                <div style={{ margin: "9px" }}>
                    <button onClick={this.handleToast}> Enable toast </button>
                </div>
            );
        }
        return (
            <div className="Timer">
                <h1>{renderComponent}</h1>
                <button onClick={this.handleClick}>Remove</button>
                {toast}
            </div>
        );
    }
}

export default Timer;

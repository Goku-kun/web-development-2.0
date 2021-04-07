import React from "react";
import "./Timer.css";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toTimeString(),
            mount: true,
        };
        this.tick = this.tick.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    handleClick(event) {
        var target = event.target;
        this.setState(changeState);

        event.target.textContent =
            target.textContent === "Time" ? "Remove" : "Time";

        // *********************************
        function changeState(previousState) {
            return {
                mount: !previousState.mount,
            };
        }
    }
    render() {
        var renderComponent;
        if (this.state.mount) {
            renderComponent = <h1>{this.state.time}</h1>;
        } else {
            renderComponent = <h1>Click button to show time</h1>;
        }
        return (
            <div className="Timer">
                <h1>{renderComponent}</h1>
                <button onClick={this.handleClick}>Remove</button>
            </div>
        );
    }
}

export default Timer;

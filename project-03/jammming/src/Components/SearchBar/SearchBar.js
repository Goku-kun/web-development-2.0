import React from "react";
import "./SearchBar.css";

class Searchbar extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.state = {
            term: "",
        };
    }
    componentDidMount() {
        if (window.sessionStorage.getItem("firstReq") === "true") {
            this.setState({
                term: window.sessionStorage.getItem("searchTerm"),
            });
            window.sessionStorage.setItem("firstReq", "false");
            this.search();
        }
    }
    handleTermChange(event) {
        this.setState({
            term: event.target.value,
        });
    }
    search() {
        this.props.onSearch(this.state.term);
    }
    render() {
        return (
            <div className="SearchBar">
                <input
                    placeholder="Enter A Song, Album, or Artist"
                    onChange={this.handleTermChange}
                    defaultValue={this.state.term}
                />
                <button className="SearchButton" onClick={this.search}>
                    SEARCH
                </button>
            </div>
        );
    }
}

export default Searchbar;

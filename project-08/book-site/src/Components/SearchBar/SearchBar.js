import React from "react";
import { TextField, Button } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import SearchingUtility from "./../../util/SearchUtil";
import "./SearchBar.css";

function SearchBar(props) {
    return (
        <div
            style={{
                backgroundColor: "white",
                textAlign: "center",
                padding: "20px",
                paddingLeft: "30px",
                paddingRight: "30px",
            }}
        >
            <TextField
                type="search"
                label="Book Name"
                variant="standard"
                style={{ color: "white" }}
                size="medium"
            />
            <Button
                style={{ marginLeft: 20 }}
                className="Search-Button"
                variant="outlined"
                color="secondary"
                endIcon={<Search />}
                onClick={handleButton}
            >
                Search
            </Button>
        </div>
    );

    async function handleButton(event) {
        SearchingUtility.searching("");
    }
}

export default SearchBar;

import "./SearchResults.css";
import Tracklist from "./../TrackList/TrackList";
import loadingTexts from "./LoadingTexts";
import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                {this.props.loading ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            paddingTop: "50px",
                        }}
                    >
                        {loadingTexts[Math.floor(Math.random() * loadingTexts.length)]}
                        <Loader
                            type="MutatingDots"
                            color="#6c41ec"
                            secondaryColor="red"
                            height={100}
                            width={100}
                        />
                    </div>
                ) : (
                    <div>
                        <h2>Results</h2>
                        <Tracklist
                            tracks={this.props.searchResults}
                            onAdd={this.props.onAdd}
                            isRemoval={false}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default SearchResults;

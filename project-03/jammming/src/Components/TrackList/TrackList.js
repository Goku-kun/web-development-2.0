import React from "react";
import "./TrackList.css";
import Track from "./../Track/Track";

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.length != 0 ? (
                    this.props.tracks.map((track) => {
                        return (
                            <Track
                                track={track}
                                key={track.id}
                                onAdd={this.props.onAdd}
                                onRemove={this.props.onRemove}
                                isRemoval={this.props.isRemoval}
                            />
                        );
                    })
                ) : (
                    <h1 style={{ marginTop: "15px" }}>Empty</h1>
                )}
            </div>
        );
    }
}
export default TrackList;

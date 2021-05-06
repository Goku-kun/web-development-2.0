import React from "react";
import "./Playlist.css";
import TrackList from "./../TrackList/TrackList";

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleNameChange(event) {
        let newValue = event.target.value;
        this.props.onNameChange(newValue);
    }
    handleSave() {
        this.props.onSave();
        document.querySelector(".Playlist-Name").value = "New Playlist";
    }
    render() {
        return (
            <div className="Playlist">
                <input
                    className="Playlist-Name"
                    defaultValue="New Playlist"
                    onChange={this.handleNameChange}
                />
                <TrackList
                    tracks={this.props.playlistTracks}
                    isRemoval={true}
                    onRemove={this.props.onRemove}
                />
                <button className="Playlist-save" onClick={this.handleSave}>
                    SAVE TO SPOTIFY
                </button>
            </div>
        );
    }
}

export default Playlist;

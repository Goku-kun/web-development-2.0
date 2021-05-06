import "./App.css";
import React from "react";
import SearchBar from "./../SearchBar/SearchBar";
import SearchResults from "./../SearchResults/SearchResults";
import PlayList from "./../Playlist/Playlist";
import Spotify from "./../../util/Spotify";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playlistName: "New Playlist",
            playlistTracks: [],
            loading: false,
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track) {
        let tracks = this.state.playlistTracks;
        if (
            tracks.find(function (savedTrack) {
                return savedTrack.id === track.id;
            })
        ) {
            return;
        } else {
            tracks.push(track);
            this.setState({
                playlistTracks: tracks,
            });
        }
    }

    removeTrack(track) {
        let tracks = this.state.playlistTracks.filter(function (savedTracks) {
            return savedTracks.id != track.id;
        });
        this.setState({
            playlistTracks: tracks,
        });
    }

    updatePlaylistName(name) {
        this.setState({
            playlistName: name,
        });
    }

    savePlaylist() {
        var trackURIs = this.state.playlistTracks.map(function generateUri(track) {
            return track.uri;
        });
        Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
            this.setState({
                playlistName: "New Playlist",
                playlistTracks: [],
            });
        });
    }

    search(searchTerm) {
        this.setState({
            loading: true,
        });
        Spotify.search(searchTerm).then((result) => {
            this.setState({
                searchResults: result,
                loading: false,
            });
        });
    }
    render() {
        return (
            <div>
                <h1>
                    Ja<span className="highlight">mmm</span>ing
                </h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                            loading={this.state.loading}
                        />
                        <PlayList
                            playlistTracks={this.state.playlistTracks}
                            playlistName={this.state.playlistName}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}
                        />
                    </div>
                    <p className="Credit">
                        Created with Love ❤️ by{" "}
                        <a
                            style={{ color: "red" }}
                            href="https://github.com/Goku-kun"
                            target="_blank"
                            rel="noreferrer"
                        >
                            @Goku-kun
                        </a>
                    </p>
                </div>
            </div>
        );
    }
}

export default App;

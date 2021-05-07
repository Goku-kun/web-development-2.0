var ACCESS_TOKEN;
const CLIENT_ID = "df22b716cadd4a568ef5f9e35c2146a0";
const REDIRECT_URI = "http://miniature-playlist.surge.sh";
var Spotify = {
    getAccessToken() {
        if (ACCESS_TOKEN) {
            return ACCESS_TOKEN;
        } else {
            //check for an access token match
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if (accessTokenMatch && expiresInMatch) {
                ACCESS_TOKEN = accessTokenMatch[1];
                var EXPIRES_IN = Number(expiresInMatch[1]);
                window.setTimeout(() => (ACCESS_TOKEN = ""), EXPIRES_IN * 1000);
                window.history.pushState("Access Token", null, "/");
            } else {
                const accessURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
                window.location = accessURL;
            }
        }
    },

    search(term) {
        if (ACCESS_TOKEN === undefined) {
            window.sessionStorage.setItem("firstReq", "true");
            window.sessionStorage.setItem("searchTerm", term);
        }
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(function respond(response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                if (!jsonResponse.tracks) {
                    return [];
                } else {
                    return jsonResponse.tracks.items.map(function looping(track) {
                        return {
                            id: track.id,
                            name: track.name,
                            artists: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri,
                        };
                    });
                }
            });
    },
    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs.length) return;

        const ACCESS_TOKEN = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        };
        let userID;

        return fetch("https://api.spotify.com/v1/me", {
            headers: headers,
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                userID = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({ name: name }),
                })
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (jsonReponse) {
                        const playlistID = jsonReponse.id;
                        return fetch(
                            `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                            {
                                headers: headers,
                                method: "POST",
                                body: JSON.stringify({ uris: trackURIs }),
                            }
                        );
                    });
            });
    },
};

export default Spotify;

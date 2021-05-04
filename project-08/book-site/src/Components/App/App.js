import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

function App() {
    return (
        <div className="App">
            <AppBar color="secondary">
                <Toolbar>
                    <IconButton>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="textPrimary">
                        Welcome to Book-site
                    </Typography>
                </Toolbar>
            </AppBar>
            <SearchBar />
        </div>
    );
}

export default App;

import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Page404 from "./pages/404";
import About from "./pages/About";
import Article from "./pages/Article";
import ArticlesList from "./pages/ArticlesList";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="articleslist" element={<ArticlesList />} />
        <Route path="articles">
          <Route index element={<h1>Read articles!</h1>} />
        </Route>
        <Route path="/articles/:articleId" element={<Article />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;

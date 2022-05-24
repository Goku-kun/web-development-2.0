import { Outlet, Link } from "react-router-dom";
import data from "./../data.json";

function ArticlesList() {
  return (
    <div>
      Articles
      {data.map((item) => {
        return (
          <h3 key={item.title}>
            <Link to={`/articles/${item.name}`}>{item.title}</Link>
          </h3>
        );
      })}
      <Outlet />
    </div>
  );
}

export default ArticlesList;

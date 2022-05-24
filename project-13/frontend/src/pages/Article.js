import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "./../data.json";

function fetchArticle(articleName) {
  return data.find((article) => article.name === articleName);
}

function Article() {
  const params = useParams();
  console.log(params);
  const name = params.articleId;

  const article = fetchArticle(name);
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const [commentValue, setCommentValue] = useState("");

  async function upvote(event) {
    await fetch(`/api/articles/${name}/upvote`, { method: "post" });
    setArticleInfo({ ...articleInfo, upvotes: articleInfo.upvotes + 1 });
  }

  async function submitComment() {
    if (commentValue === "") return;

    let newArticleInfo = await fetch(`/api/articles/${name}/add-comment`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: new Date().toTimeString() + "gkun",
        comment: commentValue,
      }),
    });
    newArticleInfo = await newArticleInfo.json();
    console.log(newArticleInfo);
    setCommentValue("");
    setArticleInfo(newArticleInfo);
  }

  useEffect(
    function () {
      (async function () {
        let articleInfo = await fetch(`/api/articles/${name}`);
        articleInfo = await articleInfo.json();
        setArticleInfo(articleInfo);
      })();
    },
    [name]
  );

  if (article === null) {
    return <h1>Article doesn't exist</h1>;
  }

  return (
    <>
      <h1>Welcome to {article.title} Page!</h1>
      <p>This article has been upvoted {articleInfo.upvotes} times.</p>
      <p>{article.content}</p>
      <button onClick={upvote}>Upvote</button>
      <textarea
        name="comment"
        id="comment-area"
        cols="30"
        rows="10"
        value={commentValue}
        onChange={(e) => setCommentValue(e.currentTarget.value)}
      ></textarea>
      <button onClick={submitComment}>Submit Comment</button>
      <h2>Comments:</h2>
      {articleInfo.comments.map(function (info, i) {
        return <h3 key={info.comment + info.username + i}>{info.comment}</h3>;
      })}
    </>
  );
}

export default Article;

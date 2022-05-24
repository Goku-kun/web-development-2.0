import express from "express";
import "core-js/stable";
import "regenerator-runtime/runtime";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();

app.get("/hello", function (req, res) {
  res.send("hello");
});

app.get("/api/articles/:name", async function (req, res) {
  try {
    const { name } = req.params;
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = await client.db("my-blog");
    const articlesInfo = await db.collection("articles").findOne({ name });
    res.status(200).json(articlesInfo);
    client.close();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/api/articles/:name/upvote", async function (req, res) {
  const { name } = req.params;
  console.log(name);
  const client = await MongoClient.connect("mongodb://localhost:27017");
  const db = await client.db("my-blog");

  const articlesInfo = await db.collection("articles").findOne({ name });

  await db.collection("articles").updateOne(
    { name },
    {
      $set: {
        upvotes: articlesInfo.upvotes + 1,
      },
    }
  );
  const updateArticleInfo = await db.collection("articles").findOne({ name });
  console.log(updateArticleInfo);
  res.status(200).json(updateArticleInfo);
});

app.post(
  "/api/articles/:name/add-comment",
  bodyParser.json(),
  async function (req, res) {
    const { body } = req;
    const { name } = req.params;

    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = await client.db("my-blog");

    const articlesInfo = await db.collection("articles").findOne({ name });

    db.collection("articles").updateOne(
      { name },
      {
        $push: {
          comments: body,
        },
      }
    );

    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name });
    res.status(200).json(updatedArticleInfo);
  }
);

app.get("/api/articles", function (req, res) {
  res.status(200).send(JSON.stringify(articlesInfo));
});

app.listen(8000, () => {
  console.log("server is online on port 8000.");
});

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const neatCsv = require("neat-csv");
const { getConnection } = require("./db");
const {
  getStocks,
  insertDocuments,
  postComment,
  getComments,
} = require("./utils");
const app = express();

app.use(cors());

const server = require("http").createServer(app);

const io = require("socket.io")(server);

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/stocks", async function (req, res) {
  const db = await getConnection();
  getStocks(db, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/comment", async function (req, res) {
  const db = await getConnection();
  postComment(db, req.body, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
    } else {
      io.sockets.emit("new-comment", result)
      res.send(result);
    }
  });
});

app.get("/comments", async function (req, res) {
  const db = await getConnection();
  getComments(db, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/feed-data", async function (req, res) {
  fs.readFile("./file.csv", async (err, file) => {
    if (err) {
      console.error(err);
      return;
    }
    const data = await neatCsv(file);
    const db = await getConnection();
    insertDocuments(db, data);
    res.send(200);
  });
});

server.listen(3001, function () {
  console.log("listening on 3001");
  io.on("connection", async function (client) {
    console.log("Client connected...");
    const db = await getConnection();
    client.on("comments", function() {
      getComments(db, function (err, result) {
        if (err) {
          console.error(err);
        } else {
          client.emit("comments", result);
        }
      });
    });
  });
});

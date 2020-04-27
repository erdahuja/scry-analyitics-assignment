const MongoClient = require('mongodb').MongoClient;
const fs = require('fs')
const neatCsv = require('neat-csv');
const dotenv = require('dotenv').config();

const { getStocks } = require("./utils");

const user = process.env.user;
const password = process.env.password;
const url = process.env.url;
let db = null;

const connectionString = `mongodb://${user}:${password}@${url}/scry-analytics`;

const getConnection = async function getConnection() {
  if (!db) {
    return new Promise((res, rej) => {
      MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
        if (err) rej(err)
        db = client.db("scry-analytics");
        // db.collection("comments").deleteMany();
        res(db);
      });
    });
  }
  return db;
}

module.exports = {
  getConnection,
}

const insertDocuments = function (db, data) {
  const collection = db.collection("stocks");

  collection.insertMany(data, function (err, result) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Inserted documents into the collection");
  });
};

const getStocks = function (db, cb) {
  const collection = db.collection("stocks");

  collection.find({}).toArray(function (err, result) {
    if (err) {
      console.error(err);
      cb(err);
    }
    cb(null, result);
  });
};

const getComments = function (db, cb) {
  const collection = db.collection("comments");

  collection.find({}).toArray(function (err, result) {
    if (err) {
      console.error(err);
      cb(err);
    }
    cb(null, result);
  });
};

const postComment = (db, record, cb) => {
  const collection = db.collection("comments");

  collection.insertOne(record, function (err, result) {
    if (err) {
      console.error(err);
      cb(err);
    }
    cb(null, result.ops);
  });
};

module.exports = {
  insertDocuments,
  getStocks,
  postComment,
  getComments,
};

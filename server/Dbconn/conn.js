const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost:27017/",
    {
        dbName: "URL-shortner-db",
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    },
    (err) =>
        err ? console.log(err) : console.log(
            "Connected to URL-shortner-db database")
);

const conn = mongoose.connection;

module.exports = conn;
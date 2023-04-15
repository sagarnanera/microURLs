const express = require('express');
const app = require('./src/app.js');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const conn = require('./Dbconn/conn');
// const cors = require('cors');

// const passport = require("passport");

const PORT = 5100;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(logger('dev'));
// app.use(cors());

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`server started on http://localhost:${PORT}`);
})

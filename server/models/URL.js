const mongoose = require("mongoose");

const Urlschema = new mongoose.Schema({
    Original_URL: {
        type: String,
        required: true
    },
    Shorten_URL_slug: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const URL = mongoose.model("url", Urlschema);

module.exports = URL;
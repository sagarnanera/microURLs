const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require("morgan");
const randomstring = require("randomstring");
const path = require("path");
const axios = require("axios");

const URL = require("../models/URL");

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cors());

const recaptchaKey = process.env.CAPTCHA_KEY;

// console.log(__dirname);
const error404 = "D:/URL-shortner/server/error_file/Error.html";

const hostname = process.env.WEB_HOST;

app.get("/", (req, res) => {
    const data = randomstring.generate();
    res.send(data);
});

app.post("/add", async (req, res) => {
    const slug = randomstring.generate(8);

    const { captchaToken } = req.body;

    const CaptchaRes = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaKey}&response=${captchaToken}`
    );

    if (CaptchaRes.data.success) {
        console.log('BOT!!!');
        res.json({ status: 403, msg: "Forbidden" });
        return;
    }

    console.log(CaptchaRes.data);

    const result = await URL.findOne({ Original_URL: req.body.URL });

    if (result) {
        res.json({
            status: 200,
            shorten_URL: hostname + result.Shorten_URL_slug
        });
        console.log(result);
    } else {
        const newrecord = new URL({
            Original_URL: req.body.URL,
            Shorten_URL_slug: slug,
            clicks: 0
        });

        const data = await newrecord.save();

        if (data) {
            res.json({ status: 200, shorten_URL: hostname + data.Shorten_URL_slug });
        } else {
            res.json({ status: 500, msg: "Internal server error" });
        }
    }
});

app.get("/:slug", (req, res) => {
    URL.findOne({ Shorten_URL_slug: req.params.slug })
        .then(result => {
            const url = result.Original_URL;
            // console.log(url);
            URL.updateOne(
                { Shorten_URL_slug: req.params.slug },
                { clicks: result.clicks + 1 },
                err => {
                    if (err) {
                        return console.log(err);
                    }
                }
            );
            res.redirect(url);
        })
        .catch(() => {
            res.sendFile(error404);
        });
});

module.exports = app;

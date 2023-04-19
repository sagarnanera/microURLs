const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const logger = require("morgan");
const randomstring = require("randomstring");
const path = require("path");
const axios = require("axios");
const isbot = require("isbot");

//middlewares
const captchaVerify = require("../middleware/captchVerifier");
const getGeoLocation = require("../middleware/geoLocation");

//models
const URL = require("../models/URL");
const Click = require("../models/Click");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cors());

const recaptchaKey = process.env.CAPTCHA_KEY;

// console.log(__dirname);
const error404 = "D:/URL-shortner/server/error_file/Error.html";

const hostname = process.env.WEB_HOST;
const port = process.env.PORT;

app.get("/", getGeoLocation, (req, res) => {
    const test_slug = randomstring.generate(8);
    res
        .status(200)
        .json({
            test_slug: test_slug,
            req_ip: req.ipAddress,
            locationInfo: req.location
        });
});

app.post("/add", getGeoLocation, async (req, res) => {
    const slug = randomstring.generate(8);
    console.log("Request IP : ", req.ipAddress);

    const { captchaToken } = req.body;

    const CaptchaRes = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaKey}&response=${captchaToken}`
    );

    if (!CaptchaRes.data.success) {
        console.log("BOT!!!", req.ip);
        res.json({ status: 403, msg: "Forbidden" });
        return;
    }

    console.log(CaptchaRes.data);

    const result = await URL.findOne({ Original_URL: req.body.URL });

    if (result) {
        res.json({
            status: 200,
            shorten_URL: "http://" + hostname + `:${port}/` + result.Shorten_URL_slug
        });
        console.log(result);
    } else {
        const newrecord = new URL({
            Original_URL: req.body.URL,
            Shorten_URL_slug: slug,
            userIP: req.ipAddress,
            locationInfo: req.location
        });

        const data = await newrecord.save();

        if (data) {
            res.json({
                status: 200,
                shorten_URL: "http://" + hostname + `:${port}/` + data.Shorten_URL_slug
            });
        } else {
            res.json({ status: 500, msg: "Internal server error" });
        }
    }
});

app.post("/add-custom-slug", captchaVerify, async (req, res) => {
    const { customSlug, URL } = req.body;

    try {
        const result = await URL.findOne({ slug: customSlug });

        if (result) {
            console.log(result);
            res.json({
                status: 409,
                error: "Slug is already taken"
            });
        } else {
            const newrecord = new URL({
                Original_URL: URL,
                Shorten_URL_slug: customSlug,
                clicks: 0
            });

            const data = await newrecord.save();

            if (data) {
                res.json({
                    status: 200,
                    shorten_URL:
                        "http://" + hostname + `:${port}/` + data.Shorten_URL_slug
                });
            } else {
                res.json({ status: 500, msg: "Internal server error" });
            }
        }
    } catch (error) {
        console.log("Exception in custom-slug handler : " + error);
        res.json({ status: 500, msg: "Internal server error" });
    }
});

app.get("/:slug", getGeoLocation, async (req, res) => {
    const userAgent = req.get("user-agent");
    const slug = req.params.slug;

    try {
        const shorten_URL = await URL.findOne({ Shorten_URL_slug: slug });

        if (!shorten_URL) {
            res.sendFile(error404);
            return;
        }

        const Original_URL = shorten_URL.Original_URL;

        console.log("is bot.." + isbot(userAgent));

        const newClick = new Click({
            URL_id: shorten_URL._id,
            isBotClick: isbot(userAgent),
            clientIP: req.ipAddress,
            locationInfo: req.location
        });

        newClick.save();

        res.redirect(Original_URL);
        return;
    } catch (error) {
        console.log("error in redirecting : " + error);
        res.status(500).json({ msg: "Internal server error.." });
    }
});

module.exports = app;

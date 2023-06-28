const axios = require("axios");

const getGeoLocation = async (req, res, next) => {
    try {
        // let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

        // console.log("headers >>>>" + req.connection.remoteAddress + "  >> " + ip);

        // if (ip.startsWith("::ffff:")) {
        //     req.ip = ip.slice(7);
        // }

        console.log("client ip : " + req.ip);

        const response = await axios.get(
            `https://get.geojs.io/v1/ip/geo/${req.ip}.json`
        );
        const data = response.data;

        // console.log(response.data);  

        const location = {
            country: data.country,
            region: data.region,
            city: data.city,
            timeZone: data.timezone,
            coordinates: [
                data.longitude !== "nil" ? data.longitude : 0,
                data.latitude !== "nil" ? data.latitude : 0
            ]
        };

        req.location = location;

        next();
    } catch (error) {
        console.error("error in geolocation middleware.....");
        res.json({ status: 500, msg: "Internal server error...." });
        return;
    }
};

module.exports = getGeoLocation;

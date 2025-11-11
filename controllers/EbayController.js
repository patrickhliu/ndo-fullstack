const require = createRequire(import.meta.url);
import { createRequire } from "module";
const winston = require('winston');
const axios = require("axios");
const EbayAuthToken = require("ebay-oauth-nodejs-client");

const logger = winston.createLogger({
    level: "info", // Set the minimum level of messages to log (e.g., "info", "debug", "error")
    format: winston.format.combine(
        winston.format.timestamp(), // Add a timestamp to your logs
        winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`; // Customize your log format
        })
    ),
    transports: [
        //new winston.transports.Console(), // Optional: Log to console as well
        new winston.transports.File({ filename: "patrick.log" }) // Log to a file named "app.log"
    ]
});

const ebayAuthToken = new EbayAuthToken({
    clientId: process.env.EBAY_CLIENT_ID,
    clientSecret: process.env.EBAY_CLIENT_SECRET,
    devid: process.env.EBAY_DEV_ID,
    //redirectUri: process.env.EBAY_RU,
    //env: "PRODUCTION",
    baseUrl: "api.ebay.com",
    //scope: ["https://api.ebay.com/oauth/api_scope"],
});

export const search = async(req, res) => {
    //console.log(process.env.EBAY_CLIENT_ID);
    //console.log(process.env.EBAY_CLIENT_SECRET);
    //console.log(process.env.EBAY_RU);
    //console.log(ebayAuthToken);
    //return;
    //console.log("hi patrick1");

    async function getAccessToken() {
        return await ebayAuthToken.getApplicationToken("PRODUCTION");
    }

    async function query() {
        let token = await getAccessToken();
        //logger.info(token);
        //logger.info(token["access_token"]);

        const response = await axios.get("https://api.ebay.com/buy/browse/v1/item_summary/search?q=switch2", {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-EBAY-C-MARKETPLACE-ID": "EBAY_US" // Example: Specify marketplace
            }
        })

        console.log(response);
        //logger.info(response);
    }

    try {
        query();
    } catch (error) {
        //console.error("Error fetching data:", error);
        console.log("error: " + error);
        logger.info("error: " + error);
    }

}


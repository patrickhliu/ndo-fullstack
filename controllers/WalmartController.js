const require = createRequire(import.meta.url);
import NintendoGame from '../models/NintendoGame.js';
import { createRequire } from "module";
import { fileURLToPath } from 'url';
const winston = require('winston');
const { Sequelize, Op, DataTypes, Model } = require('sequelize');
import sequelize from './../config/db.js';
const NodeRSA = require('node-rsa');
const axios = require("axios");
const path = require('path');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fs = require('fs');

import dotenv from 'dotenv';
dotenv.config()

const logger = winston.createLogger({
    level: 'info', // Set the minimum level of messages to log (e.g., 'info', 'debug', 'error')
    format: winston.format.combine(
        winston.format.timestamp(), // Add a timestamp to your logs
        winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`; // Customize your log format
        })
    ),
    transports: [
        //new winston.transports.Console(), // Optional: Log to console as well
        new winston.transports.File({ filename: 'patrick.log' }) // Log to a file named 'app.log'
    ]
});

const consumerId = process.env.WALMART_CONSUMER_ID;
const keyVersion = process.env.WALMART_KEY_VERSION;
//const privateKeyPath = './WM_IO_private_key.pem';

function generateWalmartSignature(consumerId, keyVersion, privateKeyPath) {
  const timestamp = Date.now().toString(); // Unix Epoch timestamp in milliseconds
  const privateKey = new NodeRSA(fs.readFileSync(privateKeyPath, 'utf8'));
  const signatureSource = `${consumerId}\n${timestamp}\n${keyVersion}\n`;
  const signature = privateKey.sign(signatureSource, 'base64', 'utf8'); // Sign the data using SHA256 with RSA

  return {
    'WM_SEC.AUTH_SIGNATURE': signature,
    'WM_CONSUMER.INTIMESTAMP': timestamp,
    'WM_CONSUMER.ID': consumerId,
    'WM_SEC.KEY_VERSION': keyVersion,
  };
}

export const getAll = async(req, res) => {
    let privateKeyPath = path.join(__dirname, 'WM_IO_private_key.pem');
    console.log(privateKeyPath);

    const headers = generateWalmartSignature(consumerId, keyVersion, privateKeyPath);
    console.log(headers);

    try {
        //let url = 'https://developer.api.walmart.com/api-proxy/service/affil/product/v2/taxonomy';
        //let url = 'https://developer.api.walmart.com/api-proxy/service/affil/product/v2/paginated/items';
        let url = 'https://developer.api.walmart.com/api-proxy/service/affil/product/v2/search?&query=donkey kong bananza&categoryId=2636&sort=bestseller&responseGroup=full';
        const response = await axios.get(url, { headers: headers });
        logger.info(JSON.stringify(response.data));
    } catch (error) {
        //console.error('Error fetching data:', error);
        console.log('error2...' + error);
    }
};
const require = createRequire(import.meta.url);
import NintendoGame from '../models/NintendoGame.js';
import { createRequire } from "module";
const winston = require('winston');
const { Sequelize, Op, DataTypes, Model } = require('sequelize');
import sequelize from './../config/db.js';

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

export const getAll = async(req, res) => {
    // Logic to fetch all users from a database or other source
    //res.status(200).json({ message: 'Getting all users' });

    let output = [];

    /* let dbResults = await NintendoGame.findAll({
        where: sequelize.where(sequelize.fn('JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"Upgrade pack"\'')), 1)
    }); */

    // if(str == "games") str = "(NOT topLevelFilters:'DLC' AND NOT topLevelFilters:'Games with DLC' AND NOT topLevelFilters:'Upgrade pack')";

   /* ITEM_NUMBER: {
        $or: [{
           $notLike: 'MF%'
        }, {
           $notLike: 'OLS%'
        }, {
           $notLike: 'MV%'
        }, {
           $notLike: 'MD%'
        }, {
           $notLike: 'AE%'
        }]
    }, */

    let dbResults = await NintendoGame.findAll({
        where: {
            top_level_filters: {
                [Op.and]: [
                    { [Op.notLike]: 'Upgrade Pack' },
                    { [Op.notLike]: 'DLC' },
                    { [Op.notLike]: 'Games with DLC' },
                ],
            },
            /* sale_price: {
                [Op.ne]: null
            }, */
            software_publisher: {
                [Op.eq]: "Nintendo",
            },
        },
        limit: 1000,
    });

    logger.info(JSON.stringify(dbResults));

    for(let o of dbResults) {
        //console.log(o);

        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const oneDay = 1000 * 60 * 60 * 24;

        let now = Date.now(); // already in ms...
        let release_date = new Date(o.release_date);
        let discountEnds = null;

        if(o.nsuid == '70010000002722') console.log(o);

        if(o.sale_price) {
            discountEnds = o.discount_price_end_timestamp * 1000;
        }

        let game = {
            nsuid: o.nsuid,
            photo_url: o.product_image_square ? o.product_image_square : "https://assets.nintendo.com/image/upload/ar_16:9,w_500/" + o.product_image,
            title: o.title.replace(/™|®|©/g, ''),
            release_date: release_date.toLocaleString('en-US', options),
            release_future: release_date > now,
            release_future_days: (release_date > now) ? Math.round(Math.abs(((Math.floor(release_date.getTime())) - now) / oneDay)) : null,
            platform_code : o.platform_code,
            sale_price: o.sale_price,
            regular_price: o.regular_price,
            discount_percent: !o.percent_off ? null : parseInt(o.percent_off),
            discount_ends: !discountEnds ? null : Math.round(Math.abs((discountEnds - now) / oneDay)),
            availability: "hard code",
            is_physical: o.is_physical,
            is_digital: o.is_digital,
        }

        //console.log(game);
        output.push(game);

    }

    logger.info(JSON.stringify(output));

    // {results:[], count:{}, total_pages:0}
    res.json({
        results: output,
        count: {
             dlc: 0,
             deals: 0,
             games_dlc: 0,
             demo: 0,
             voucher: 0,
             upgrade: 0,
        },
        total_pages: 1,
    });
};
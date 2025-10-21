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

    let addedLikeOperator = ["Coming soon"].map((word) => ({ [Op.iLike]: `%${word || ""}%` })) //this line will add iLike operator for each string

    let dbResults = await NintendoGame.findAll({
        where: {
            /* top_level_filters: {
                [Op.and]: [
                    { [Op.notLike]: 'Upgrade Pack' },
                    { [Op.notLike]: 'DLC' },
                    { [Op.notLike]: 'Games with DLC' },
                ],
            },
            sale_price: {
                [Op.ne]: null,
            },
             dlc_type: {
                [Op.eq]: null,
            },
            is_upgrade: {
                [Op.eq]: false,
            },
            software_publisher: {
                [Op.eq]: "Nintendo",
            }, */
            is_physical: {
                [Op.eq]: true,
            },
        },
        /* where: sequelize.where(
            //sequelize.fn('JSON_CONTAINS', sequelize.col('availability'), sequelize.literal('\'"Coming soon"\''), ), 1
            sequelize.fn('JSON_CONTAINS', sequelize.col('availability'), sequelize.literal('\'"Coming soon"\''), ), 1
        ), */
        limit: 1000,
    });

    logger.info(JSON.stringify(dbResults));

    for(let o of dbResults) {
        //console.log(o);
        // "https://place-hold.it/500x500/D3D3D3/111?text=No%20Image&fontsize=60"

        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const oneDay = 1000 * 60 * 60 * 24;

        let now = Date.now(); // already in ms...
        let release_date = new Date(o.release_date);
        let discountEnds = null;
        let photoGallery = [{
            src: "https://assets.nintendo.com/image/upload/ar_16:9,w_1280/" + o.product_image,
            width:1280,
            height:720,

        }];
        let videoGallery = [];

        //if(o.nsuid == '70010000002722') console.log(o);

        if(o.sale_price) {
            discountEnds = o.discount_price_end_timestamp * 1000;
        }

        if(o.product_gallery) {
            for(let m of o.product_gallery) {
                if(m.resourceType == "image") {
                    photoGallery.push({
                        src: "https://assets.nintendo.com/image/upload/ar_16:9,w_1280/" + m.publicId,
                        width:1280,
                        height:720,
                    });
                }

                if(m.resourceType == "video") videoGallery.push("https://assets.nintendo.com/image/upload/ar_16:9,w_1280/" + m.publicId);
            }
        }

        let game = {
            nsuid: o.nsuid,
            //photo_url: "https://assets.nintendo.com/image/upload/ar_16:9,w_512/" + o.product_image,
            title: o.title.replace(/™|®|©/g, ''),
            release_date: release_date.toLocaleString('en-US', options),
            release_future: release_date > now,
            release_future_days: (release_date > now) ? Math.round(Math.abs(((Math.floor(release_date.getTime())) - now) / oneDay)) : null,
            platform_code : o.platform_code,
            sale_price: o.sale_price,
            regular_price: o.regular_price,
            discount_percent: !o.percent_off ? null : parseInt(o.percent_off),
            discount_ends: !discountEnds ? null : Math.round(Math.abs((discountEnds - now) / oneDay)),
            availability: o.availability,
            is_physical: o.is_physical,
            is_digital: o.is_digital,
            file_size: o.file_size,
            software_publisher: o.software_publisher,
            software_developer: o.software_developer,
            photo_gallery: photoGallery,
            video_gallery: videoGallery,
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
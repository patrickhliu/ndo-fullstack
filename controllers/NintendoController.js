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
    //let offset = 0;
    //console.log(JSON.parse(req.query.filters));
    let queryFilters = JSON.parse(req.query.filters);

    let take = 24;
    let skip = (req.query.current_page - 1) * take
    let output = [];

    let constraints = {
        where: {
            //is_featured:true,
        },
        offset: skip,
        limit: take,
    };

    if(req.query.q) {
        constraints.where.title = { [Op.like]: '%' + req.query.q + '%' }
    }

    if(queryFilters.sort_by == "title") {
        constraints.order = [['title', 'ASC']]

        if(queryFilters.sort_dir == "desc") {
            constraints.order = [['title', 'DESC']]
        }
    }

    if(queryFilters.sort_by == "price") {
        constraints.order = [['regular_price', 'ASC']]

        if(queryFilters.sort_dir == "desc") {
            constraints.order = [['regular_price', 'DESC']]
        }
    }

    if(queryFilters.price_range == 0) {
        // free to start...
    } else if(queryFilters.price_range == 1) {
        constraints.where.regular_price =  { [Op.gte]: 0, [Op.lte]: 9.99 }
    } else if(queryFilters.price_range == 2) {
        constraints.where.regular_price =  { [Op.gte]: 10, [Op.lte]: 19.99 }
    } else if(queryFilters.price_range == 3) {
        constraints.where.regular_price =  { [Op.gte]: 20, [Op.lte]: 39.99 }
    } else if(queryFilters.price_range == 4) {
        constraints.where.regular_price =  { [Op.gte]: 40 }
    } else if(queryFilters.price_range == 5) {
        // "all"
    }

    if(queryFilters.game_category == "games") {
        if(!constraints.where[Op.and]) constraints.where[Op.and] = [];

        constraints.where[Op.and].push([
            sequelize.where(sequelize.fn('NOT JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"DLC"\'')), 1),
            sequelize.where(sequelize.fn('NOT JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"Games with DLC"\'')), 1),
            sequelize.where(sequelize.fn('NOT JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"Upgrade pack"\'')), 1),
        ]);
    } else if(queryFilters.game_category =="featured") {
        constraints.where.is_featured =  { [Op.gte]: true }
    } else if(queryFilters.game_category =="dlc") {
        if(!constraints.where[Op.and]) constraints.where[Op.and] = [];

        constraints.where[Op.and].push([
            sequelize.where(sequelize.fn('JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"DLC"\'')), 1),
        ]);
    } else if(queryFilters.game_category == "both") {
        constraints.where.dlc_type = { [Op.like]: '%rom bundle%' }
        /* if(!constraints.where[Op.and]) constraints.where[Op.and] = [];

        constraints.where[Op.and].push([
            sequelize.where(sequelize.fn('JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"Games with DLC"\'')), 1),
        ]); */
    } else if(queryFilters.game_category == "upgrade") {
        if(!constraints.where[Op.and]) constraints.where[Op.and] = [];

        constraints.where[Op.and].push([
            sequelize.where(sequelize.fn('JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"Upgrade pack"\'')), 1),
        ]);
    }

    if(queryFilters.demo) {
        if(!constraints.where[Op.and]) constraints.where[Op.and] = [];

        constraints.where[Op.and].push([
            sequelize.where(sequelize.fn('JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"Demo available"\'')), 1),
        ]);
    }

    if(queryFilters.format == "physical") {
        if(!constraints.where[Op.and]) constraints.where[Op.and] = [];

        constraints.where[Op.and].push([
            sequelize.where(sequelize.fn('JSON_CONTAINS', sequelize.col('editions'), sequelize.literal('\'"Physical"\'')), 1),
        ]);
    } else if(queryFilters.format == "digital") {
        if(!constraints.where[Op.and]) constraints.where[Op.and] = [];

        constraints.where[Op.and].push([
            sequelize.where(sequelize.fn('JSON_CONTAINS', sequelize.col('editions'), sequelize.literal('\'"Digital"\'')), 1),
        ]);
    }

    if(queryFilters.sales) {
        constraints.where.sale_price = { [Op.not]: null }
    }

    if(queryFilters.console == "switch1") {
        constraints.where.platform_code = { [Op.eq]: "NINTENDO_SWITCH" };
    } else if(queryFilters.console == "switch2") {
        constraints.where.platform_code = { [Op.eq]: "NINTENDO_SWITCH_2" };
    }

    console.log(queryFilters.availability);

    if(queryFilters.availability == 1) {
        if(!constraints.where[Op.and]) constraints.where[Op.and] = [];

        constraints.where[Op.and].push([
            sequelize.where(sequelize.fn('JSON_CONTAINS', sequelize.col('availability'), sequelize.literal('\'["Available now"]\'')), 1),
        ]);
    } else if(queryFilters.availability == 2) {
        if(!constraints.where[Op.and]) constraints.where[Op.and] = [];

        constraints.where[Op.and].push([
            sequelize.where(sequelize.fn('JSON_CONTAINS', sequelize.col('availability'), sequelize.literal('\'["Coming soon"]\'')), 1),
        ]);
    } else if(queryFilters.availability == 3) {
        if(!constraints.where[Op.and]) constraints.where[Op.and] = [];

        constraints.where[Op.and].push([
            sequelize.where(sequelize.fn('JSON_CONTAINS', sequelize.col('availability'), sequelize.literal('\'["New releases"]\'')), 1),
        ]);
    } else if(queryFilters.availability == 4) {
        if(!constraints.where[Op.and]) constraints.where[Op.and] = [];

        constraints.where[Op.and].push([
            sequelize.where(sequelize.fn('JSON_CONTAINS', sequelize.col('availability'), sequelize.literal('\'["Pre-order"]\'')), 1),
        ]);
    }

    console.log('-----------------------');
    console.log(constraints);

    let dbResults = await NintendoGame.findAll(constraints);

    delete constraints.offset;
    delete constraints.limit;
    let dbResultsCount = await NintendoGame.count(constraints);

    console.log(dbResultsCount);

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

    /* let dbResults2 = await NintendoGame.findAll({
        where: {
            is_featured: {
                [Op.eq]: true,
            }
            [Op.and]: [
                sequelize.where(sequelize.fn('NOT JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"DLC"\'')), 1),
                //sequelize.where(sequelize.fn('NOT JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"Games with DLC"\'')), 1),
                sequelize.where(sequelize.fn('NOT JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"Upgrade pack"\'')), 1),
                sequelize.where(sequelize.fn('JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"Deals"\'')), 1),
                //sequelize.where(sequelize.fn('LOWER', sequelize.col('software_publisher')), "nintendo"),
            ],
            title: {
                [Op.like]: "%donkey kong%",
            },

        },
        where: sequelize.where(sequelize.fn('NOT JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"DLC"\''), ), 1),
        where: sequelize.where(sequelize.fn('NOT JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"Upgrade pack"\''), ), 1),
        where: sequelize.where(
            sequelize.fn('NOT JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"DLC"\''), ), 1
        ),

        orWhere: sequelize.where(
            //sequelize.fn('JSON_CONTAINS', sequelize.col('availability'), sequelize.literal('\'"Coming soon"\''), ), 1
            sequelize.fn('JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"Games with DLC"\''), ),
            1
        ),
        orWhere: sequelize.where(
            //sequelize.fn('JSON_CONTAINS', sequelize.col('availability'), sequelize.literal('\'"Coming soon"\''), ), 1
            sequelize.fn('JSON_CONTAINS', sequelize.col('top_level_filters'), sequelize.literal('\'"Upgrade pack"\''), ),
            1
        ),
        offset: skip,
        limit: take,
    }); */

    //logger.info(JSON.stringify(dbResults));

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

                if(m.resourceType == "video") {
                    videoGallery.push({
                        src: "https://assets.nintendo.com/video/upload/ar_16:9,w_1280/" + m.publicId,
                        width:1280,
                        height:720,
                    });
                }
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
            file_size: o.file_size,
            software_publisher: o.software_publisher,
            software_developer: o.software_developer,
            photo_gallery: photoGallery,
            video_gallery: videoGallery,
            url: o.url,
            url_key: o.url_key,
            top_level_filters: !o.top_level_filters ? [] : o.top_level_filters,
            dlc_type: !o.dlc_type ? null : o.dlc_type,
            is_dlc_content: !o.top_level_filters ? false : o.top_level_filters.includes("DLC") && o.dlc_type.replace(/[^a-zA-Z0-9\s]/g, '') == "Individual",
            is_dlc_available: !o.top_level_filters ? false : o.top_level_filters.includes("Games with DLC"),
            is_demo_available: !o.top_level_filters ? false : o.top_level_filters.includes("Demo available"),
            is_bundle: !o.dlc_type ? false : o.dlc_type.includes("Bundle"),
            is_upgrade: o.is_upgrade,
            editions: !o.editions ? [] : o.editions,
            availability: !o.availability ? [] : o.availability,
            //walmart_url: o.walmart_url,
        }

        //console.log(game);
        output.push(game);

    }

    logger.info(JSON.stringify(output));

    // {results:[], count:{}, total_pages:0}
    res.json({
        games: output,
        hasMore: dbResultsCount > (req.query.current_page * take)
    });
};
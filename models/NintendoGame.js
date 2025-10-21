import { createRequire } from "module";
const require = createRequire(import.meta.url);
import sequelize from './../config/db.js';
const { Sequelize, Op, DataTypes, Model } = require('sequelize');

class NintendoGame extends Model {}

NintendoGame.init(
  {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nsuid:  {
        type: DataTypes.STRING,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    content_rating: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    content_rating_system: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    regular_price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    final_price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    sale_price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    amount_off: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    percent_off: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    price_range: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    discount_price_end: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    discount_price_end_timestamp: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    platform_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_image_square: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    product_gallery: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    release_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    top_level_filters: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    url_key: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    demo_nsuid: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dlc_type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    has_dlc: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    is_digital: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    is_physical: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    is_upgrade: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    is_exclusive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    is_featured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    is_shovelware: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    availability: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    software_developer: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    software_publisher: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    franchises: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    created_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updated_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    nintendo_updated_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    content_descriptors: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    player_count: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    play_modes: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    tag_labels: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    top_level_category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    top_level_category_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    visible_in_search: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    genres: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    game_genre_labels: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    game_feature_labels: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    nso_features: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    ways_to_play_labels: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    file_size: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'NintendoGame', // We need to choose the model name
    tableName: 'nintendo_games',
    timestamps: false,
  },
);

// the defined model is the class itself
console.log(NintendoGame === sequelize.models.NintendoGame); // true

export default NintendoGame;
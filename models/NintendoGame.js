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
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    top_level_filters: {
        type: DataTypes.JSON,
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
    release_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    platform_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sale_price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    regular_price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
    },
    price_range: {
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
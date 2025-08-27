import dotenv from "dotenv";
import {Sequelize, DataTypes} from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
  logging: false,
  });

const CountryRating = sequelize.define("CountryRating", {
  country_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  dislikes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: "country_ratings",
  timestamps: false,
});

export {sequelize, CountryRating};

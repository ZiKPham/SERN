import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: "world",
  user: "root",
  password: process.env.PASSWORD,
  host: "localhost",
  port: 3306,
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = connectDB;

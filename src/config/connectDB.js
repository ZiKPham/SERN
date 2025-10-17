import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: "world",
  user: "root",
  password: "Zikph@m0907",
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

require("dotenv").config();
const { Sequelize } = require("sequelize");

const {
  DB_CONNECTION,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_SOCKET,
} = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_CONNECTION,
  dialectOptions: {
    socketPath: DB_SOCKET,
  },
  port: DB_PORT,
});

module.exports = sequelize;

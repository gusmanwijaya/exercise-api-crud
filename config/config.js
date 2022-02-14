require("dotenv").config();

const {
  DB_CONNECTION,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_SOCKET,
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_CONNECTION,
    port: DB_PORT,
    dialectOptions: {
      socketPath: DB_SOCKET,
    },
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_CONNECTION,
    port: DB_PORT,
    dialectOptions: {
      socketPath: DB_SOCKET,
    },
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_CONNECTION,
    port: DB_PORT,
    dialectOptions: {
      socketPath: DB_SOCKET,
    },
  },
};

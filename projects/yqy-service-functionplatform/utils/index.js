/*
 * @Author: yuanqingyan
 * @Date: 2022-03-23 09:46:59
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-03-23 10:04:17
 * @Description: utils 工具类 【mysql-sequelize实例】
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\utils\index.js
 */
const {
  Sequelize
} = require("sequelize");
const config = require("../config/index").mysql_connection_config;

const sequelizeInstance = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
});

module.exports = {
  sqlInstance: sequelizeInstance
}
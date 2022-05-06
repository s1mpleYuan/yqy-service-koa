/*
 * @Author: yuanqingyan
 * @Date: 2022-03-23 09:46:59
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-06 16:20:21
 * @Description: utils 工具类 【mysql-sequelize实例】
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\utils\index.js
 */
const {
  Sequelize
} = require("sequelize");
const config = require("../config/index").mysql_connection_config;
const dayjs = require('dayjs');

const sequelizeInstance = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
  logging: false
});

/**
 * @description: 获取特定位数的随机ID 最短为9
 * @params {*}
 * @return {*}
 * @author: yuanqingyan
 * @param {*} length id 位数 最小为9
 */
function getId(length) {
  if (length < 9) {
    console.error('getId length 最小为 9');
    return;
  }
  const dateStr = dayjs().format('MMDDss')
  const surplus_Dig = length - 6;
  const surplus_Dig_ID = (Math.random() * Math.pow(10, surplus_Dig)).toFixed(0);
  return '' + surplus_Dig_ID + dateStr;
}

module.exports = {
  sqlInstance: sequelizeInstance,
  getId
}
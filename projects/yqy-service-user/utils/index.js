/*
 * @Author: yuanqingyan
 * @Date: 2022-03-23 09:46:59
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-06-08 16:41:59
 * @Description: utils 工具类 【mysql-sequelize实例】
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\utils\index.js
 */
const {
  Sequelize
} = require("sequelize");
const config = require("../config/index").__mysql_connection_config;
const dayjs = require('dayjs');
const { NODE_ENV } = process.env;

const sequelizeInstance = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
  logging: NODE_ENV == 'development'
});

/**
 * @description: 生成特定格式的随机id
 * @return {String} 生成的 id
 * @author: yuanqingyan
 * @param {String} identification id 前缀标识
 * @param {Number} size  生成的id不包含前缀标识的长度
 * @param {Boolean} string 是否包含字符串 默认false
 */
function getRandomID(identification, size, string = false) {
  return new Promise((resolve, reject) => {
    try {

      // 生成的随机 id 字符
      let random_str = '';
      // 全字符字典
      const all_dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
      // 只包含数字的字典
      const only_number_dictionary = '1234567890';

      // 根据是否需要包含字符 决定生成 id 所选择的字典以及长度
      const random_dictionary = string ? all_dictionary : only_number_dictionary;
      const random_length = string ? 61 : 9;
      // 随机数生成特定范围的随机整数
      for (let index = 0; index < size; index++) {
        // 特定范围生成的随机数
        const random_index = Math.floor(Math.random() * random_length);
        // 当前位数生成的随机字符 id
        const str = random_dictionary.substr(random_index, 1);
        random_str += str;
      }
      resolve(identification + random_str);
    } catch (error) {
      reject(error);
    }
  })
}

module.exports = {
  sqlInstance: sequelizeInstance,
  getRandomID
}
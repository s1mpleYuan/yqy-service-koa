/*
 * @Author: yuanqingyan
 * @Date: 2022-03-23 09:46:59
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-27 11:35:20
 * @Description: utils 工具类 【mysql-sequelize实例】
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\utils\index.js
 */
const {
  Sequelize
} = require("sequelize");
const config = require('../config/index');
const dayjs = require('dayjs');

const dbConfig = config.__mysql_conection_cofig;
const sequelizeInstance = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: "mysql",
  logging: true
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
      const str = random_dictionary.splice(random_index, 1);
      random_str += str;
    }
    return identification + random_str;

  } catch (error) {
    throw error;
  }
}



module.exports = {
  sqlInstance: sequelizeInstance,
  getRandomID
}
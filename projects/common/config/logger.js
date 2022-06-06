/*
 * @Author: yuanqingyan
 * @Date: 2022-05-26 14:48:26
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-27 10:16:00
 * @Description: 日志输出
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\config\logger.js
 */
const log4js = require('log4js');
const config = {
  appenders: {},
  categories: {
    default: {
      appenders: [], // 存放的位置
      level: 'trace' // 级别
    }
  }
};

class Logger {

}
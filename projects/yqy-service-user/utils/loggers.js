/*
 * @Author: yuanqingyan
 * @Date: 2022-06-08 10:37:19
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-06-08 16:03:49
 * @Description: api 接口日志打印输出
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\utils\loggers.js
 */
const dayjs = require('dayjs');
const fs = require("fs");
const { MODULE_NAME, NODE_ENV } = process.env;

/**
 * 日志输出类型：
 * 信息输出 info 输出到控制台并生成 info_log 文件
 * 错误异常 error 输出到控制台并生成 error_log 文件
 * 调试 debug 输出到控制台但不生成日志文件
 */

// 日志存写路径
const log_file_url = 'E:\\development\\';

function writeLogger(title, message, level = 'info') {
  const filePath = log_file_url + `${MODULE_NAME}-${dayjs().format('YYYY-MM-DD')}_${level}.txt`;
  fs.open(filePath, 'a+', (err, fd) => {
    if (err) {
      throw new Error(`${filePath} 日志文件读写异常`);
      return;
    }
    const log_context = `${dayjs().format('YYYY-MM-DD HH:mm:ss')}【${MODULE_NAME}】 ${title} - ${message}\n`
    fs.write(fd, log_context, {
      flag: 'w+'
    }, (err) => {
      if (err) {
        throw new Error(`${filePath}文件写入失败`);
        return;
      }
    })
  })
}

function createLogger() {
  return async function(ctx, next) {
    global.INFO = (title, message) => {
      process.stdout.write(`\x1b[7;34m ${MODULE_NAME} ` + `\x1b[0;33m ${dayjs().format('YYYY-MM-DD HH:mm:ss')} \x1b[1;32m ${title} \x1b[0m - ${message}\n`);
      if (process.env.NODE_ENV == 'production') {
        writeLogger(title, message, 'info')
      }
    }
    global.ERROR = (title, message) => {
      process.stdout.write(`\x1b[7;31m ${MODULE_NAME} ` + `\x1b[0;33m ${dayjs().format('YYYY-MM-DD HH:mm:ss')} \x1b[1;31m ${title} \x1b[0m - ${message}\n`);
      if (process.env.NODE_ENV == 'production') {
        writeLogger(title, message, 'error')
      }
    }
    global.DEBUG = (title, message) => {
      process.stdout.write(`\x1b[1;1m ${MODULE_NAME} \x1b[0m` + `\x1b[0;36m ${dayjs().format('YYYY-MM-DD HH:mm:ss')} \x1b[1;31m ${title} - \x1b[0m${message}\n`)
    }
    await next();
  }
}

module.exports = createLogger;
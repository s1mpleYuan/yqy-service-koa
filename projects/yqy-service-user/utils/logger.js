/*
 * @Author: yuanqingyan
 * @Date: 2022-04-25 09:53:51
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-26 14:04:59
 * @Description: 代码运行时的控制台输出插件
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\utils\logger.js
 */
const dayjs = require('dayjs');
const fs = require('fs');

// 日志存写路径
const log_file_url = 'E:\\development\\';

const project_name = 'functionPlatform'

const save_log = (moduleName, fn, text, type = 'DEBUG') => {
  const log_file_name = log_file_url + `${project_name}-${dayjs().format('YYYY-MM-DD')}_${type}.txt`;
  fs.open(log_file_name, 'a+', (err, fd) => {
    if (err) {
      throw new Error(`${log_file_name}文件读取异常`);
      return;
    }
    const log_context = `${dayjs().format('YYYY-MM-DD HH:mm:ss')}【${moduleName}】 ${fn} - ${text}\n`
    fs.write(fd, log_context, {
      flag: 'w+'
    }, (err) => {
      if (err) {
        throw new Error(`${log_file_name}文件写入失败`);
        return;
      }
    })
  })
}

module.exports = function logger() {
  global.http_log = (moduleName, fn, text) => {
    process.stdout.write(`\x1b[7;34m ${moduleName} ` + `\x1b[0;33m ${dayjs().format('YYYY-MM-DD HH:mm:ss')} \x1b[1;32m ${fn} \x1b[0m - ${text}\n`);
    save_log(moduleName, fn, text);
  }
  global.log = (name, text) =>
    process.stdout.write(`\x1b[1;1m ${name} \x1b[0m` + `\x1b[0;36m ${dayjs().format('YYYY-MM-DD HH:mm:ss')} - \x1b[0m${text}\n`)

  global.error = (moduleName, fn, errorText) => {
    process.stdout.write(`\x1b[7;31m ${moduleName} ` + `\x1b[0;33m ${dayjs().format('YYYY-MM-DD HH:mm:ss')} \x1b[1;31m ${fn} \x1b[0m - ${errorText}\n`);
    save_log(moduleName, fn, errorText, 'ERROR');
  }
  global.std_clear = () => {
    process.stdout.cursorTo(0, 0);
    process.stdout.clearScreenDown();
  }
  global.save_log = save_log;
}
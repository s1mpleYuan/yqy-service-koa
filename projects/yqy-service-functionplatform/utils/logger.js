/*
 * @Author: yuanqingyan
 * @Date: 2022-04-25 09:53:51
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-05 17:27:28
 * @Description: 代码运行时的控制台输出插件
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\utils\logger.js
 */
const dayjs = require('dayjs');
const FONT_STYLE = {
  normal: 0,
  bold: 1,
  underline: 4,
  background: 7
};
const FONT_COLORS = {
  default: 30,
  red: 31,
  green: 32,
  yellow: 33,
  deepblue: 34,
  purple: 35,
  blue: 36
}
const logStyle = (style, color, input) => `\x1b[${style};${color}m${input}\x1b[0m`

const HTTP_LOG = (name, text) =>
  process.stdout.write(logStyle(FONT_STYLE['background'], FONT_COLORS['darkblue'], ': ' + text));
const LOG = (name, text) =>
  process.stdout.write(logStyle(FONT_STYLE['normal'], FONT_COLORS['yellow'], dayjs().format('YYYY-MM-DD HH:mm:ss')) + ' - ' + logStyle(FONT_STYLE['bold'], FONT_COLORS['green'], name) + ' ' + text)

module.exports = {
  HTTP_LOG,
  LOG
};
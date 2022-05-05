/*
 * @Author: yuanqingyan
 * @Date: 2022-04-25 09:53:51
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-05 08:23:55
 * @Description: 代码运行时的控制台输出插件
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\utils\console.js
 */
const primaryStyle = {
  'color': '#00cf99'
}

module.exports = console = () => {
  PRO_LOG = function(name, msg) {
    console.log(`%c【${name}】`, )
  }
}
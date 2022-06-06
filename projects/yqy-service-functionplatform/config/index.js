/*
 * @Author: yuanqingyan
 * @Date: 2022-03-21 16:26:31
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-26 09:11:54
 * @Description: 项目 config
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\config\index.js
 */
const config = {
  project_name: "yqyDBfunctionPlatform",
  project_port: 9101,
  mysql_connection_config: {
    host: "49.235.247.3",
    database: "functionplatform",
    user: "admin",
    password: "yqy19981222",
    port: "3306"
  },
  jwt_config: {
    secret: "yqy_functionPlatform",
    expiresIn: "12h"
  },
  randomId_config: {
    // **_**_**  第一个 id标识  第二个随机id串的随机串长度  第三个 随机id串是否包含字母
    userId: 'UID_11_0',
    roleId: 'RID_6_0'
  }
}

module.exports = config;
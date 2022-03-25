/*
 * @Author: yuanqingyan
 * @Date: 2022-03-21 16:26:31
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-03-24 09:08:59
 * @Description: 项目 config
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\config\index.js
 */
const config = {
  project_name: "yqyDBfunctionPlatform",
  project_port: 9101,
  mysql_connection_config: {
    host: "49.235.247.3",
    database: "functionplatform",
    user: "functionplatform",
    password: "RJNFKdf75Hf3P8B3",
    port: "3306"
  },
  jwt_config: {
    secret: "yqy_functionPlatform",
    expiresIn: "6h"
  }
}

module.exports = config;
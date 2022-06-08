/*
 * @Author: yuanqingyan
 * @Date: 2022-05-24 15:33:07
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-06-08 17:13:09
 * @Description: 配置config文件
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\config\index.js
 */

const config = {
  // 项目名称
  __project_name: 'user',
  // 项目运行端口号
  __project_port: 9100,
  // mysql 数据库链接配置对象
  __mysql_connection_config: {
    host: '49.235.247.3',   // 数据库所在服务器IP
    database: 'yqy-user', // 数据库名称
    user: 'yqy-user',  // 数据库登入用户的账户名
    password: 'yqy19981222',  // 数据库登入用户的密码
    port: 3306 // 数据库端口号
  },
  // 项目接口token标识jsonWebToken配置
  __jwt_config: {
    secret: 'yqyUserAccess', // 密钥
    expiresIn: '12h' // 超时的时间点
  },
  // 万维易源 api
  __show_api_config: {
    appId: '168712',
    secret: 'f9cad40fe8a147e592b2c8346b8c994d'
  }
}

module.exports = config;
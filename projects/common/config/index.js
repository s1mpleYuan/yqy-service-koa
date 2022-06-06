/*
 * @Author: yuanqingyan
 * @Date: 2022-05-26 13:37:36
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-26 13:48:33
 * @Description: yqy-service-koa 公共config配置对象文件 仅用于模板与特别定义，不可直接复制使用，如需修改则申请
 * @FilePath: \yqy-service-koa\projects\common\config\index.js
 */
/**
 * 项目配置模板 需要根据各自项目的需要更改内容和名称
 */
const TEMPLATE_CONFIG = {
  // 项目名称
  __project_name: 'new project name',
  // 项目运行端口号
  __project_port: 1111,
  // mysql 数据库链接配置对象
  __mysql_conection_cofig: {
    host: 'datebase host',   // 数据库所在服务器IP
    database: 'databse name', // 数据库名称
    user: 'database log in user name',  // 数据库登入用户的账户名
    password: 'database log in user password',  // 数据库登入用户的密码
    port: 'database port' // 数据库端口号
  },
  // 项目接口token标识jsonWebToken配置
  __jwt_confg: {
    secret: 'serct', // 密钥
    expiresIn: 'expiration time' // 超时的时间点
  }
}
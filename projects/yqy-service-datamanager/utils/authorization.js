/*
 * @Author: yuanqingyan
 * @Date: 2022-03-21 17:26:43
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-03-21 17:28:36
 * @Description: api 校验
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\utils\authorization.js
 */
const jsonwebtoken = require("jsonwebtoken");

const config = require("../config/index").jwt_config;

const ACCESS_TOKEN = (userId) => {
  return jsonwebtoken.sign({ userId }, config.secret, {
    expiresIn: config.expiresIn,
  });
};

module.exports = ACCESS_TOKEN;
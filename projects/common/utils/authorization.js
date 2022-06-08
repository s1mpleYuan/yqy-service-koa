/*
 * @Author: yuanqingyan
 * @Date: 2022-03-21 17:26:43
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-06-08 10:34:30
 * @Description: api 校验
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\utils\authorization.js
 */
const jsonwebtoken = require("jsonwebtoken");

const config = require("../config/index").__jwt_config;

const ACCESS_TOKEN = (userId) => {
  try {
    return jsonwebtoken.sign({
      userId
    }, config.secret, {
      expiresIn: config.expiresIn,
    })
  } catch (error) {
    throw error;
  };
};

module.exports = ACCESS_TOKEN;
/*
 * @Author: yuanqingyan
 * @Date: 2022-05-24 15:43:57
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-24 15:44:10
 * @Description: User Service 用户
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\services\userService.js
 */

const userModules = require('../modules/user');
const {
  assign
} = require('lodash');
const md5 = require('md5');

module.exports.createUser = (userInfo) => {
  const tmpUserInfo = assign(userInfo, {
    password: md5(userInfo.password)
  });
  return userModules.createUser(tmpUserInfo)
};

module.exports.queryUserByLogin = (loginUserInfo) => {
  return userModules.queryUserByPWD({
    ...loginUserInfo,
    password: md5(loginUserInfo.password)
  })
};
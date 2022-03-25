/*
 * @Author: yuanqingyan
 * @Date: 2022-03-23 10:06:10
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-03-25 08:37:48
 * @Description: 数据库 build
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\build.js
 */
const UserModel = require('./models/user');
const UserInfoModel = require('./models/userInfo');

const {
  sqlInstance
} = require('./utils/index');
const {
  QueryTypes
} = require("sequelize")
const {
  isEmpty,
  isString
} = require('lodash');

// UserModel.sync({
//   force: true
// });

// UserModel.create({
//   userId: '443080742'
// }).then(result => {
//   console.log(result);
// })

// UserModel.findAll({
//   // attributes: {
//   //   exclude: ['updateTime']
//   // },
//   raw: true
// }).then(res => {
//   console.log(res);
// })
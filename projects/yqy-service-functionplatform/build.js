/*
 * @Author: yuanqingyan
 * @Date: 2022-03-23 10:06:10
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-11 17:22:10
 * @Description: 数据库 build
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\build.js
 */
const UserModel = require('./models/user');
const UserInfoModel = require('./models/userInfo');
const GfPointModel = require('./models/gfpoint');
const PointListModel = require('./models/pointList');
const PointExchangeRecordModel = require('./models/pointExchangeRecord');
const ConfigureModel = require('./models/configure');
const PlatformMenuModel = require('./models/platformMenu');
const YsMaterialModel = require('./models/ysMaterial');
const RoleModel = require('./models/role');
const FileUpload = require('./models/fileUpload');

const {
    sqlInstance
} = require('./utils/index');
const {
    isEmpty,
    isString
} = require('lodash');

FileUpload.sync({
    alter: true
});

// UserModel.create({
//   userId: '443080742'
// }).then(result => {
//   // console.log(result);

// UserModel.findAll({
//   // attributes: {
//   //   exclude: ['updateTime']
//   // },
// }).then(res => {
//   console.log(res[0].createTime);
// })
// })

// UserInfoModel.create({
//   userId: "443080742",
//   userName: "Yuan",
//   password: "123456"
// }).then(() => {
// UserInfoModel.findAll({
//   attributes: ['userName'],
//   // raw: true
// }).then(res => {
//   console.log(res[0].userName);
// })
// })

// const userInfo = UserInfoModel.build({
//     userId: "443080742",
//     userName: "Yuan",
//     password: "123456"
// });
// console.log(userInfo.userName);
/*
 * @Author: yuanqingyan
 * @Date: 2022-05-24 15:41:39
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-27 11:34:29
 * @Description: User Modules 用户操作数据库 MODULES
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\modules\user.js
 */

const UserModel = require('../models/user');
const UserInfoModel = require('../models/userInfo');
const {
  getRandomID,
  sqlInstance
} = require('../utils/index');
const {
  Op
} = require('sequelize')

/**
 * @description: 创建用户，先创建 UserModel 再创建 UserInfoModel 
 * @return {*} userInfoModel
 * @author: yuanqingyan
 * @param {*} userInfo 需要创建的 用户信息
 */
async function createUser(userInfo) {
  // 创建事务对象
  const t = await sqlInstance.transaction();
  try {
    // 先创建 UserModel
    const user = await UserModel.create({
      userId: getRandomID('UID', 9)
    }, {
      transaction: t
    });
    const newUserInfo = await UserInfoModel.create({
      userId: user.userId, // 使用前面创建的用户Id
      ...userInfo
    }, {
      transaction: t
    });
    // 提交事务
    t.commit();
    return newUserInfo;
  } catch (error) {
    await t.rollback();
    console.error('【createUser】 事务回滚: ' + error);
    throw error.errors[0].message || error;
  }
}

function queryUserByPWD({
  loginStr,
  password
}) {
  return UserInfoModel.findOne({
    attributes: {
      exclude: ['password', 'createTime', 'updateTime']
    },
    where: {
      [Op.or]: {
        userId: loginStr,
        userName: loginStr,
        email: loginStr,
        phone: loginStr
      },
      password
    }
  })
}

function queryUsers(queryUserInfo) {}


module.exports = {
  createUser,
  queryUserByPWD,
  queryUsers
}
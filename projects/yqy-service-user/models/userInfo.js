/*
 * @Author: yuanqingyan
 * @Date: 2022-05-24 15:44:43
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-27 11:34:55
 * @Description: UserInfo Sequelize Model 依赖于 User
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\models\userInfo.js
 */
const {
  DataTypes,
  Model,
  Op,
  Sequelize
} = require("sequelize");
const {
  sqlInstance
} = require("../utils");
const dayjs = require("dayjs");

class UserInfoModel extends Model {}

UserInfoModel.init({
  userId: {
    type: DataTypes.STRING(12),
    primaryKey: true,
    comment: '用户唯一标识，依赖于 users.userId'
  },
  userName: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    comment: '用户名称'
  },
  password: {
    type: DataTypes.STRING(256),
    allowNull: false,
    comment: '用户登录密码'
  },
  email: {
    type: DataTypes.STRING(30),
    comment: '用户邮箱',
    get() {
      return this.getDataValue('email') || ''
    }
  },
  phone: {
    type: DataTypes.STRING(11),
    comment: '用户联系方式',
    get() {
      return this.getDataValue('phone') || ''
    }
  },
  avatarUrl: {
    type: DataTypes.STRING,
    comment: '用户头像url',
    get() {
      return this.getDataValue('avatarUrl') || ''
    }
  },
  createTime: {
    type: DataTypes.DATE,
    comment: "创建时间",
    get() {
      return dayjs(this.getDataValue("createTime").toString()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
    set(value) {
      this.setDataValue("createTime", dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
    }
  },
  updateTime: {
    type: DataTypes.DATE,
    comment: "更新时间",
    get() {
      return dayjs(this.getDataValue("updateTime").toString()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
    set(value) {
      this.setDataValue("updateTime", dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
    }
  },
}, {
  sequelize: sqlInstance,
  tableName: 'userInfo',
  updatedAt: 'updateTime',
  createdAt: 'createTime'
})

module.exports = UserInfoModel;
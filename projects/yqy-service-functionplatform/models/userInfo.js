/*
 * @Author: yuanqingyan
 * @Date: 2022-03-24 09:44:46
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-03-24 17:26:08
 * @Description: UserInfo Sequelize Model 依赖于 User
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\models\userInfo.js
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
    type: DataTypes.STRING(9),
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
    comment: '用户邮箱'
  },
  phone: {
    type: DataTypes.STRING(11),
    comment: '用户联系方式'
  },
  avatarUrl: {
    type: DataTypes.STRING,
    comment: '用户头像url'
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

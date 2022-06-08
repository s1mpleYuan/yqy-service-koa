/*
 * @Author: yuanqingyan
 * @Date: 2022-05-24 15:44:43
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-06-08 16:37:32
 * @Description: User Sequelize Model
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\models\user.js
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

class UserModel extends Model {}

UserModel.init({
  userId: {
    type: DataTypes.STRING(12),
    primaryKey: true,
    comment: '用户唯一标识id'
  },
  userType: {
    type: DataTypes.STRING(10),
    comment: '用户类型 ordinary 普通用户 system 系统管理员 other 其他特殊权限用户'
  },
  createTime: {
    type: DataTypes.DATE,
    comment: "创建时间",
    get() {
      return dayjs(this.getDataValue("createTime")).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }
  },
  updateTime: {
    type: DataTypes.DATE,
    comment: "更新时间",
    get() {
      return dayjs(this.getDataValue("updateTime")).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }
  },
}, {
  sequelize: sqlInstance,
  tableName: 'users',
  createdAt: "createTime",
  updatedAt: "updateTime",
})

module.exports = UserModel;
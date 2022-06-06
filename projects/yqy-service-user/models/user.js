/*
 * @Author: yuanqingyan
 * @Date: 2022-05-24 15:44:43
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-27 11:34:50
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
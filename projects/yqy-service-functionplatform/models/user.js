/*
 * @Author: yuanqingyan
 * @Date: 2022-03-23 09:50:11
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-03-24 17:51:28
 * @Description: User Sequelize Model
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\models\user.js
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
    type: DataTypes.STRING(9),
    primaryKey: true,
    comment: '用户唯一标识id'
  },
  createdAt: {
    type: DataTypes.DATE,
    comment: "创建时间",
    get() {
      // return dayjs(this.getDataValue("createAt")).format(
      //   "YYYY-MM-DD HH:mm:ss"
      // );
      return "123";
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    comment: "更新时间",
    get() {
      return dayjs(this.getDataValue("updateAt")).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }
  },
}, {
  sequelize: sqlInstance,
  tableName: 'users',
})

module.exports = UserModel;
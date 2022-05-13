/*
 * @Author: yuanqingyan
 * @Date: 2022-05-09 09:59:37
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-09 10:13:26
 * @Description: Role Sequelize Model
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\models\role.js
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

class RoleModel extends Model {}

RoleModel.init({
  roleId: {
    type: DataTypes.STRING(9),
    primaryKey: true,
    comment: '角色唯一标识ID'
  },
  roleName: {
    type: DataTypes.STRING(30),
    comment: '角色名称'
  },
  permission: {
    type: DataTypes.STRING,
    comment: '角色权限 0 总管理员 1 普通管理员 2 I类用户 3 II 二类用户 4 III 三类用户'
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
  tableName: 'role',
  createdAt: "createTime",
  updatedAt: "updateTime",
})

module.exports = RoleModel;
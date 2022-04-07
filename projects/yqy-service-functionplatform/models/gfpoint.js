/*
 * @Author: yuanqingyan
 * @Date: 2022-04-07 15:03:49
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-04-07 15:36:22
 * @Description: Points Sequelize Model 积分项（女朋友版）
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\models\gfpoint.js
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

class GfPointModel extends Model {}

GfPointModel.init({
  id: {
    type: DataTypes.STRING(9),
    primaryKey: true,
    comment: '积分项主键ID'
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '可积分项名称',
  },
  point: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '积分'
  },
  unit: {
    type: DataTypes.STRING(3),
    allowNull: false,
    comment: '积分单位'
  },
  isUse: {
    type: DataTypes.BOOLEAN,
    comment: '是否启用'
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
  }
}, {
  sequelize: sqlInstance,
  tableName: 'gfPoints',
  updatedAt: 'updateTime',
  createdAt: 'createTime'
})

module.exports = GfPointModel;

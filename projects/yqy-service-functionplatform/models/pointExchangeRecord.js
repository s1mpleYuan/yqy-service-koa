/*
 * @Author: yuanqingyan
 * @Date: 2022-04-07 15:27:48
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-04-07 15:37:44
 * @Description: PointExchangeRecordModel Sequelize 积分清单兑换记录
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\models\pointExchangeRecord.js
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

class PointExchangeRecordModel extends Model {}

PointExchangeRecordModel.init({
  recordId: {
    type: DataTypes.STRING(12),
    primaryKey: true,
    comment: '积分兑换记录标识ID'
  },
  userId: {
    type: DataTypes.STRING(9),
    primaryKey: true,
    comment: '当前兑换清单记录所属用户，依赖于users.userId'
  },
  pointListId: {
    type: DataTypes.STRING(12),
    comment: '当前兑换的积分清单的标识，依赖于pointlist.listId'
  },
  exchangeQuantity: {
    type: DataTypes.INTEGER,
    comment: '兑换数量'
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
  tableName: 'pointexchangerecord',
  updatedAt: 'updateTime',
  createdAt: 'createTime'
})

module.exports = PointExchangeRecordModel;
/*
 * @Author: yuanqingyan
 * @Date: 2022-04-07 15:20:07
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-04-07 15:30:41
 * @Description: PointList Sequelize Model 积分清单
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\models\pointList.js
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

class PointListModel extends Model {}

PointListModel.init({
  listId: {
    type: DataTypes.STRING(12),
    primaryKey: true,
    comment: '积分清单项标识ID'
  },
  listType: {
    type: DataTypes.STRING(10),
    comment: '积分清单类型'
  },
  listName: {
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: '积分清单项名称'
  },
  totalPoint: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '所需积分'
  },
  exchangeCycle: {
    type: DataTypes.STRING(5),
    allowNull: false,
    comment: '积分兑换周期'
  },
  explain: {
    type: DataTypes.STRING(200),
    comment: '积分清单项说明'
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
  },
}, {
  sequelize: sqlInstance,
  tableName: 'pointlist',
  updatedAt: 'updateTime',
  createdAt: 'createTime'
})

module.exports = PointListModel;
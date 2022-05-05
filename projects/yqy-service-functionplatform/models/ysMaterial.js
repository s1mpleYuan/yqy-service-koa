/*
 * @Author: yuanqingyan
 * @Date: 2022-04-24 09:09:53
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-04-24 10:35:15
 * @Description: YsMaterial Sequelize Model 原神 材料清单
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\models\ysMaterial.js
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

class YsMaterialModel extends Model {}

YsMaterialModel.init({
  id: {
    type: DataTypes.STRING(11),
    primaryKey: true,
    comment: '唯一标识'
  },
  userId: {
    type: DataTypes.STRING(9),
    comment: '所属用户，依赖于 users.userId'
  },
  materialType: {
    type: DataTypes.STRING(1),
    comment: '材料类型 0 怪物掉落 1 野外采集 2 秘境获取'
  },
  materialName: {
    type: DataTypes.STRING(30),
    allowNull: false,
    comment: '材料名称'
  },
  materialIconUrl: {
    type: DataTypes.STRING,
    comment: '材料图标'
  },
  materialLevel: {
    type: DataTypes.STRING(1),
    comment: '材料星级， 1星至5星'
  },
  currentCount: {
    type: DataTypes.INTEGER,
    comment: '材料当前数量'
  },
  acquisitionSource: {
    type: DataTypes.STRING,
    comment: '材料获取来源'
  },
  materialLimit: {
    type: DataTypes.STRING,
    comment: '材料获取限制'
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
  tableName: 'userYsMaterialList',
  updatedAt: 'updateTime',
  createdAt: false
})

module.exports = YsMaterialModel;

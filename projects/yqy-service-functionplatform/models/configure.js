/*
 * @Author: yuanqingyan
 * @Date: 2022-04-08 09:03:25
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-04-08 09:14:43
 * @Description: Configure Sequelize Models
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\models\configure.js
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

class ConfigureModel extends Model {}

ConfigureModel.init({
    configId: {
        type: DataTypes.STRING(12),
        primaryKey: true,
        comment: '配置标识ID'
    },
    configKey: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
        comment: '配置字段KEY值'
    },
    configName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        comment: '配置字段中文名称'
    },
    configValue: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '配置字段的VALUE值',
        get() {
            return this.getDataValue('configState') == '0' ? null : this.getDataValue('configValue');
        }
    },
    configPlain: {
        type: DataTypes.STRING(200),
        comment: '配置字段文本描述, 可为空'
    },
    configState: {
        type: DataTypes.STRING(1),
        comment: '当前配置的状态 0 该配置已禁用 无法获取(查询时为null); 1 该配置正常使用'
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
    tableName: 'configure',
    updatedAt: 'updateTime',
    createdAt: 'createTime'
})

module.exports = ConfigureModel;
/*
 * @Author: yuanqingyan
 * @Date: 2022-04-08 09:17:34
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-09 10:14:41
 * @Description: PlatformMenu Sequelize Model 平台菜单
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\models\platformMenu.js
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

class PlatformMenuModel extends Model {}

PlatformMenuModel.init({
    menuId: {
        type: DataTypes.STRING(3),
        primaryKey: true,
        comment: '平台菜单标识ID'
    },
    menuName: {
        type: DataTypes.STRING(20),
        comment: '平台菜单名称'
    },
    menuURL: {
        type: DataTypes.STRING,
        comment: '平台菜单URL, 可以是vue 路由也可能是http(s)链接'
    },
    menuType: {
        type: DataTypes.STRING(1),
        comment: '平台菜单类型 0 平台入口 1 平台子菜单'
    },
    permission: {
        type: DataTypes.STRING(10),
        comment: '菜单权限 属于哪类用户 0 总管理员 1 普通管理员 2 I类用户 3 II 类用户 4 III 类用户'
    },
    state: {
        type: DataTypes.STRING(1),
        comment: '是否启用菜单，0 禁用菜单 1 启用菜单'
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
    tableName: 'platformMenu',
    updatedAt: 'updateTime',
    createdAt: 'createTime'
})
module.exports = PlatformMenuModel;
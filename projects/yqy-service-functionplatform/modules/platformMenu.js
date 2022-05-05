/*
 * @Author: yuanqingyan
 * @Date: 2022-04-08 09:26:45
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-04-25 09:46:12
 * @Description: Platform Modules 平台菜单 modules
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\modules\platformMenu.js
 */
const PlatformMenuModel = require('../models/platformMenu');
const {
    getId
} = require('../utils/index');

/**
 * @description: 创建平台菜单Model 默认菜单为启用(1)
 * @return {PlatformMenuModel} 创建成功的平台菜单Model
 * @author: yuanqingyan
 * @param {String} name 菜单名称
 * @param {String} url 菜单URL
 */
function createPlatformMenu(name, url, menuType, permission = "-1") {
    return PlatformMenuModel.create({
        menuId: getId(12),
        menuName: name,
        menuURL: url,
        menuType,
        state: '1',
        permission
    });
}

/**
 * @description: 查询平台菜单
 * @params {*} 查询条件对象
 * @return {*} 查询到的平台菜单数组
 * @author: yuanqingyan
 * @param {*} queryObj 查询条件对象
 */
function findPlatformMenu(queryObj) {
    return PlatformMenuModel.findAll({
        where: queryObj,
        raw: true
    });
}

module.exports = {
    createPlatformMenu,
    findPlatformMenu
}
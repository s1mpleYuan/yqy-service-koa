/*
 * @Author: yuanqingyan
 * @Date: 2022-04-08 09:26:45
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-04-08 10:02:10
 * @Description: Platform Modules 平台菜单 modules
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\modules\platformMenu.js
 */
const PlatformMenuModel = require('../models/platformMenu');
const { getId } = require('../utils/index');

/**
 * @description: 创建平台菜单Model 默认菜单为启用(1)
 * @return {PlatformMenuModel} 创建成功的平台菜单Model
 * @author: yuanqingyan
 * @param {String} name 菜单名称
 * @param {String} url 菜单URL
 */
function createPlatformMenu(name, url) {
    return PlatformMenuModel.create({
        menuId: getId(12),
        menuName: name,
        menuURL: url,
        state: '1'
    });
}

module.exports = {
    createPlatformMenu
}
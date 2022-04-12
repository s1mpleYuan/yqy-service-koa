/*
 * @Author: yuanqingyan
 * @Date: 2022-04-08 09:34:07
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-04-08 10:01:55
 * @Description: PlatformMenu Service 平台菜单
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\services\platformMenuService.js
 */
const pMModules = require("../modules/platformMenu");

/**
 * @description: 创建平台菜单 Service 方法
 * @return {PlatformMenuModel} 创建成功的平台菜单Model
 * @author: yuanqingyan
 * @param {Object} 平台菜单信息 { name, url }
 */
module.exports.createPlatformMenu = ({ name, url }) => pMModules.createPlatformMenu(name, url)
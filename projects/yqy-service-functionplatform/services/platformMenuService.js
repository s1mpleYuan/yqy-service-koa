/*
 * @Author: yuanqingyan
 * @Date: 2022-04-08 09:34:07
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-04-25 09:46:34
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
module.exports.createPlatformMenu = ({ name, url, type }) => pMModules.createPlatformMenu(name, url, type)

/**
 * @description: 查询是否有存在重名的平台菜单
 * @params {*} 检查的平台菜单名称
 * @return {Boolean} 是否查询到有重复的平台菜单 true 存在 false 不存在
 * @author: yuanqingyan
 * @param {String} name 检查的平台菜单名称
 */
module.exports.checkPlatformMenuIsExistName = async (name) => {
  const platformMenus = await pMModules.findPlatformMenu({ menuName: name });
  return platformMenus.length > 0;
}
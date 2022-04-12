/*
 * @Author: yuanqingyan
 * @Date: 2022-04-08 09:38:58
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-04-08 09:59:43
 * @Description: Platform Route 平台菜单路由
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\routes\modules\platformMenu.js
 */
const router = require('koa-router')();
const { createPlatformMenu } = require('../../services/platformMenuService');

router.prefix('/func/platform');

router.post('/createPlatformMenu', async ctx => {
    try {
        // console.log(ctx.request.body);
        const pm = await createPlatformMenu(ctx.request.body);
        ctx.success(pm);
    } catch (error) {
        console.error(error);
        ctx.fail('平台菜单创建失败');
    }
})
module.exports = router;
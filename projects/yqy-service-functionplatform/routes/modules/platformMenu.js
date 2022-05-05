/*
 * @Author: yuanqingyan
 * @Date: 2022-04-08 09:38:58
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-04-25 09:52:09
 * @Description: Platform Route 平台菜单路由
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\routes\modules\platformMenu.js
 */
const router = require('koa-router')();
const { createPlatformMenu, checkPlatformMenuIsExistName } = require('../../services/platformMenuService');

router.prefix('/func/platform');

router.post('/createPlatformMenu', async ctx => {
    try {
        const { name, url, type } = ctx.request.body;
        if (!url) {
            ctx.fail('菜单 url 不可为空', 10001);
            return;
        }
        console.log(123);
        // const pm = await createPlatformMenu(ctx.request.body);
        // ctx.success(pm);
        const isExistName = await checkPlatformMenuIsExistName(name);
        ctx.success();
    } catch (error) {
        console.error(error);
        ctx.fail('平台菜单创建失败');
    }
})
module.exports = router;
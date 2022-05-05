/*
 * @Author: yuanqingyan
 * @Date: 2022-04-07 15:39:46
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-05 17:28:31
 * @Description: User Route 用户接口路由
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\routes\modules\user.js
 */
const router = require('koa-router')();
const {
    createUser,
    queryUserByLogin
} = require('../../services/userService');
const ACCESS_TOKEN = require('../../utils/authorization');

router.prefix("/func/user");

router.post('/register', async(ctx) => {
    try {
        // console.log(ctx.request.body);
        const user = await createUser(ctx.request.body)
        ctx.success(user);
    } catch (error) {
        ctx.fail(error);
    }
});

router.post('/login', async(ctx) => {
    try {
        const user = await queryUserByLogin(ctx.request.body);
        
        ctx.success({
            ...user.dataValues,
            token: ACCESS_TOKEN(user.userId)
        });
    } catch (error) {
        ctx.fail(error)
    }
})

module.exports = router;
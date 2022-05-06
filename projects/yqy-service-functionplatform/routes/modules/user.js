/*
 * @Author: yuanqingyan
 * @Date: 2022-04-07 15:39:46
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-06 16:22:04
 * @Description: User Route 用户接口路由
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\routes\modules\user.js
 */
const router = require('koa-router')();
const {
    createUser,
    queryUserByLogin
} = require('../../services/userService');
const ACCESS_TOKEN = require('../../utils/authorization');
const validator = require('../../utils/validator');
const moduleName = 'user';

router.prefix("/func/user");

router.post('/register', async (ctx) => {
    try {
        // console.log(ctx.request.body);
        const user = await createUser(ctx.request.body)
        ctx.success(user);
    } catch (error) {
        ctx.fail(error);
    }
});

router.post('/login', async (ctx, next) => {
    await validator(ctx, next, ctx.request.body, {
        loginStr: {
            required: true,
            min: 8
        },
        password: {
            required: true,
            min: 8,
            max: 20
        }
    }, moduleName, 'login');
}, async (ctx) => {
    try {
        const user = await queryUserByLogin(ctx.request.body);
        if (user) {
            ctx.success({
                ...user.dataValues,
                token: ACCESS_TOKEN(user.userId)
            });
            http_log('user', 'login', `${user.userId} ${user.userName} 登录`);
        } else ctx.fail('登录失败，请检查输入的账号或密码是否正确');
    } catch (error) {
        ctx.fail(error)
    }
})

module.exports = router;
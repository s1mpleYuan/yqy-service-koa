/*
 * @Author: yuanqingyan
 * @Date: 2022-05-24 15:39:45
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-06-07 14:00:34
 * @Description: User Route 用户接口路由
 * @FilePath: \yqy-service-koa\projects\yqy-service-user\routes\modules\user.js
 */

const router = require('koa-router')();
const {
  createUser,
  queryUserByLogin
} = require('../../services/userService');
const ACCESS_TOKEN = require('../../utils/authorization');
const validator = require('../../utils/validator');

router.prefix("/user");


router.get('/news', (ctx, next) => {
  ctx.body = "新闻page"
});

// 注册 register
router.post('/register', validator({
  userName: {
    required: true
  },
  password: {
    required: true,
    min: 8,
    max: 20
  },
  email: {},
  phone: {},
  avatarUrl: {}
}), async (ctx) => {
  try {
    const user = await createUser(ctx.request.body)
    if (user) {
      ctx.success(user, '注册成功');
    } else ctx.fail('注册失败，请联系管理员');
  } catch (error) {
    ctx.fail(error);
  }
});


// 登录 login
router.post('/login', validator({
  loginStr: {
    required: true,
    min: 8
  },
  password: {
    required: true,
    min: 8,
    max: 20
  }
}), async (ctx) => {
  try {
    const user = await queryUserByLogin(ctx.request.body);
    if (user) {
      ctx.success({
        ...user.dataValues,
        token: ACCESS_TOKEN(user.userId)
      }, '登录成功');
      http_log('user', 'login', `${user.userId} ${user.userName} 登录`);
    } else ctx.fail('登录失败，请检查输入的账号或密码是否正确');
  } catch (error) {
    ctx.fail(error)
  }
})


module.exports = router;
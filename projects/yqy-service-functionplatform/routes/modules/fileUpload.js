/*
 * @Author: yuanqingyan
 * @Date: 2022-05-11 17:27:43
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-12 11:12:02
 * @Description: FileUpload Route 文件上传接口路由
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\routes\modules\fileUpload.js
 */
const router = require('koa-router')();
const multer = require('koa-multer');
const validator = require('../../utils/validator');
const moduleName = 'user';

router.prefix('/func/fileUpload');

const storage = (savePath = '') => {
  return multer.diskStorage({
    // 文件保存路径
    destination(req, file, cb) {
      cb(null, `../../../fileStorage/uploads${(savePath.includes('/') ? '' : '/') + savePath}`)
    },
    // 修改文件名称
    filename(req, file, cb) {
      const fileFormat = (file.originalname).split(".");
      cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
  })
}

const imagesUpload = multer({
  storage: storage('/images')
})

// 上传图片
router.post('/imagesUpload', imagesUpload.single('file'), async ctx => {
  ctx.body = {
    filename: ctx.req.file.filename, //返回文件名
    body: ctx.req.body
  }
});

module.exports = router;
/*
 * @Author: yuanqingyan
 * @Date: 2022-05-11 17:14:14
 * @LastEditors: yuanqingyan
 * @LastEditTime: 2022-05-11 17:23:02
 * @Description: FileUpload Sequelize Model
 * @FilePath: \yqy-service-koa\projects\yqy-service-functionplatform\models\fileUpload.js
 */
const {
  DataTypes,
  Model,
  Op,
  Sequelize
} = require("sequelize");
const {
  sqlInstance
} = require("../utils");
const dayjs = require("dayjs");

class FileUpload extends Model {}

FileUpload.init({
  fileId: {
    type: DataTypes.STRING(11),
    primaryKey: true,
    comment: '文件唯一标识 ID'
  },
  fileName: {
    type: DataTypes.STRING,
    comment: '文件名称'
  },
  folderName: {
    type: DataTypes.STRING(20),
    comment: '文件夹名称'
  },
  fileType: {
    type: DataTypes.STRING,
    comment: '文件类型'
  },
  uploadTime: {
    type: DataTypes.DATE,
    comment: "文件上传时间",
    get() {
      return dayjs(this.getDataValue("createTime").toString()).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
    set(value) {
      this.setDataValue("createTime", dayjs(value).format('YYYY-MM-DD HH:mm:ss'))
    }
  }
}, {
  sequelize: sqlInstance,
  tableName: 'fileUpload',
  updatedAt: false,
  createAt: 'uploadTime'
});

module.exports = FileUpload;
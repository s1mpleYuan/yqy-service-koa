const ACCESS_TOKEN = require('./utils/authorization');

// console.log(ACCESS_TOKEN('123'));

const {
  getId,
  sqlInstance
} = require('./utils');
// console.log('test');
// try {
//   sqlInstance.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

console.log(getId(9));
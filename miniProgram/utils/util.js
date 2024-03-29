//公共js，主要做表单验证，以及基本方法封装
const utils = {
  isEmpty: function (value) {
    //是否为空
    return value === null || value === '' || value === undefined;
  },
  trim: function (value) {
    //去空格
    return value.replace(/(^\s*)|(\s*$)/g, "");
  },
  isMobile: function (value) {
    //是否为手机号
    return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(value);
  },
  isFloat: function (value) {
    //金额，只允许保留两位小数
    return /^([0-9]*[.]?[0-9])[0-9]{0,1}$/.test(value);
  },
  isNum: function (value) {
    //是否全为数字
    return /^[0-9]+$/.test(value);
  }
}

module.exports = {
  isEmpty: utils.isEmpty,
  trim: utils.trim,
  isMobile: utils.isMobile,
  isFloat: utils.isFloat,
  isNum: utils.isNum
}
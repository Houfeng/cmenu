/**
 * Copyright (c) 2019-present Houfeng
 * @author Houfeng <admin@xhou.net>
 */

module.exports = (webpackConf) => {
  webpackConf.resolve = webpackConf.resolve || {};
  webpackConf.resolve.alias = webpackConf.resolve.alias || {};
  webpackConf.module.loaders.forEach(item => {
    const test = item.test.toString();
    if (!test.includes('.less')) return;
    item.loader.splice(2, 0, {
      loader: 'classname-loader',
      options: {
        prefix: 'c-',
        exclude: []
      }
    });
  });
};
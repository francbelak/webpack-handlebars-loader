'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Data = function Data(Handlebars, options) {
  var _this = this;

  _classCallCheck(this, Data);

  this.initialized = true;
  this.languages = [];
  this.data = [];
  var dataFiles = options.data;
  if (typeof options.data === 'string') {
    dataFiles = [options.data];
  }
  dataFiles.forEach(function (dataGlob) {
    _glob2.default.sync(dataGlob).forEach(function (dataObj) {
      var dataName = (0, _utils.removeExtension)(dataObj.substr(dataObj.lastIndexOf('/') + 1));
      if (dataName.indexOf('_') === 0) {
        _this.data.push(JSON.parse(_fs2.default.readFileSync(dataObj)));
        return;
      }
      _this.languages.push({
        name: dataName,
        data: JSON.parse(_fs2.default.readFileSync(dataObj, 'utf8'))
      });
    });
  });
};

exports.default = Data;
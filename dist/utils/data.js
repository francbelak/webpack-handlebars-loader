'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Data = function () {
  function Data(Handlebars, options, loaderContext) {
    var _this = this;

    _classCallCheck(this, Data);

    this.languages = [];
    this.data = [];
    this.loaderContext = loaderContext;
    this.dataFiles = options.data;
    if (typeof options.data === 'string') {
      this.dataFiles = [options.data];
    }
    this.dataFiles.forEach(function (dataGlob) {
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
  }

  _createClass(Data, [{
    key: 'addDependencies',
    value: function addDependencies() {
      var _this2 = this;

      this.dataFiles.forEach(function (dataGlob) {
        _glob2.default.sync(dataGlob).forEach(function (dataObj) {
          _this2.loaderContext.dependency(dataObj);
        });
      });
    }
  }]);

  return Data;
}();

exports.default = Data;
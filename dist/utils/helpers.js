'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helpers = function () {
  function Helpers(Handlebars, options, loaderContext) {
    _classCallCheck(this, Helpers);

    this.loaderContext = loaderContext;
    this.helpers = options.helpers;
    if (typeof options.helpers === 'string') {
      this.helpers = [options.helpers];
    }
    this.helpers.forEach(function (helperGlob) {
      _glob2.default.sync(helperGlob).forEach(function (helper) {
        var helperName = options.helperNamer(helper);
        var helperPath = _path2.default.resolve(helper);
        delete require.cache[require.resolve(helperPath)];
        Handlebars.registerHelper(helperName, require(helperPath));
      });
    });
  }

  _createClass(Helpers, [{
    key: 'addDependencies',
    value: function addDependencies() {
      var _this = this;

      this.helpers.forEach(function (helperGlob) {
        _glob2.default.sync(helperGlob).forEach(function (helper) {
          _this.loaderContext.dependency(_path2.default.resolve(helper));
        });
      });
    }
  }]);

  return Helpers;
}();

exports.default = Helpers;
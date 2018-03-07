'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helpers = function Helpers(Handlebars, options) {
  _classCallCheck(this, Helpers);

  this.initialized = true;
  var helpers = options.helpers;
  if (typeof options.helpers === 'string') {
    helpers = [options.helpers];
  }
  helpers.forEach(function (helperGlob) {
    _glob2.default.sync(helperGlob).forEach(function (helper) {
      var helperName = options.helperNamer(helper);
      var helperPath = _path2.default.resolve(helper);
      delete require.cache[require.resolve(helperPath)];
      Handlebars.registerHelper(helperName, require(helperPath));
    });
  });
};

exports.default = Helpers;
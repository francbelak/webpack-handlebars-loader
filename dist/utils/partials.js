'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Partials = function Partials(Handlebars, options) {
  _classCallCheck(this, Partials);

  this.initialized = true;
  var partials = options.partials;
  if (typeof options.partials === 'string') {
    partials = [options.partials];
  }
  partials.forEach(function (partialGlob) {
    _glob2.default.sync(partialGlob).forEach(function (partial) {
      var partialName = options.partialNamer(partial);
      var partialPath = _path2.default.resolve(partial);
      Handlebars.registerPartial(partialName, _fs2.default.readFileSync(partialPath, 'utf-8'));
    });
  });
};

exports.default = Partials;
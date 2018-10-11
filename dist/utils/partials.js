'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Partials = function () {
  function Partials(Handlebars, options, loaderContext) {
    _classCallCheck(this, Partials);

    this.loaderContext = loaderContext;
    this.partials = options.partials;

    if (typeof this.partials === 'string') {
      this.partials = [this.partials];
    }

    this.partials.forEach(function (partialGlob) {
      _glob2.default.sync(partialGlob).forEach(function (partial) {
        var partialName = options.partialNamer(partial);
        var partialPath = _path2.default.resolve(partial);
        Handlebars.registerPartial(partialName, _fs2.default.readFileSync(partialPath, 'utf-8'));
      });
    });
  }

  _createClass(Partials, [{
    key: 'addDependencies',
    value: function addDependencies() {
      var _this = this;

      this.partials.forEach(function (partialGlob) {
        _glob2.default.sync(partialGlob).forEach(function (partial) {
          _this.loaderContext.dependency(_path2.default.resolve(partial));
        });
      });
    }
  }]);

  return Partials;
}();

exports.default = Partials;
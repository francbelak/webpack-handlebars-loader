'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global expect */


var _helpers = require('./helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _utils = require('./utils');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HandlebarsMock = function () {
  function HandlebarsMock() {
    _classCallCheck(this, HandlebarsMock);

    this.helpers = [];
  }

  _createClass(HandlebarsMock, [{
    key: 'registerHelper',
    value: function registerHelper(helper) {
      this.helpers.push({
        helpername: helper
      });
    }
  }]);

  return HandlebarsMock;
}();

test('Test Helper registration for options passed as string', function () {
  var handlebarsMock = new HandlebarsMock();
  new _helpers2.default(handlebarsMock, {
    helpers: 'src/testfiles/helpers/helperA.js',
    helperNamer: _utils.defaultNamer
  });

  expect(handlebarsMock.helpers[0].helpername).toEqual('helpers/helperA');
});

test('Test Helper registration for options passed as array', function () {
  var handlebarsMock = new HandlebarsMock();
  new _helpers2.default(handlebarsMock, {
    helpers: ['src/testfiles/helpers/helperA.js', 'src/testfiles/helpers/helperB.js'],
    helperNamer: _utils.defaultNamer
  });

  expect(handlebarsMock.helpers[0].helpername).toEqual('helpers/helperA');
  expect(handlebarsMock.helpers[1].helpername).toEqual('helpers/helperB');
});

test('Test adding partials dependencies', function () {
  var handlebarsMock = new HandlebarsMock();
  var loaderMock = {
    dependencies: [],
    dependency: function dependency(_dependency) {
      this.dependencies.push(_dependency);
    }
  };

  var helpers = new _helpers2.default(handlebarsMock, {
    helpers: ['src/testfiles/helpers/helperA.js', 'src/testfiles/helpers/helperB.js'],
    helperNamer: _utils.defaultNamer
  }, loaderMock);

  helpers.addDependencies();

  expect(loaderMock.dependencies[0]).toEqual(_path2.default.resolve('src/testfiles/helpers/helperA.js'));
  expect(loaderMock.dependencies[1]).toEqual(_path2.default.resolve('src/testfiles/helpers/helperB.js'));
});
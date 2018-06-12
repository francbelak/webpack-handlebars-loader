'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* global expect */


var _partials = require('./partials');

var _partials2 = _interopRequireDefault(_partials);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HandlebarsMock = function () {
  function HandlebarsMock() {
    _classCallCheck(this, HandlebarsMock);

    this.partials = [];
  }

  _createClass(HandlebarsMock, [{
    key: 'registerPartial',
    value: function registerPartial(helper) {
      this.partials.push({
        helpername: helper
      });
    }
  }]);

  return HandlebarsMock;
}();

test('Test Partial init', function () {
  var handlebarsMock = new HandlebarsMock();
  var partial = new _partials2.default(handlebarsMock, {
    partials: 'src/testfiles/partials/partialA.js',
    partialNamer: _utils.defaultNamer
  });

  expect(partial.initialized).toEqual(true);
});

test('Test Partials registration for options passed as string', function () {
  var handlebarsMock = new HandlebarsMock();
  new _partials2.default(handlebarsMock, {
    partials: 'src/testfiles/partials/partialA.js',
    partialNamer: _utils.defaultNamer
  });

  expect(handlebarsMock.partials[0].helpername).toEqual('partials/partialA');
});

test('Test Helper registration for options passed as array', function () {
  var handlebarsMock = new HandlebarsMock();
  new _partials2.default(handlebarsMock, {
    partials: ['src/testfiles/partials/partialA.js', 'src/testfiles/partials/partialB.js'],
    partialNamer: _utils.defaultNamer
  });

  expect(handlebarsMock.partials[0].helpername).toEqual('partials/partialA');
  expect(handlebarsMock.partials[1].helpername).toEqual('partials/partialB');
});
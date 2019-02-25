"use strict";

var _partials = _interopRequireDefault(require("./partials"));

var _utils = require("./utils");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HandlebarsMock =
/*#__PURE__*/
function () {
  function HandlebarsMock() {
    _classCallCheck(this, HandlebarsMock);

    this.partials = [];
  }

  _createClass(HandlebarsMock, [{
    key: "registerPartial",
    value: function registerPartial(helper) {
      this.partials.push({
        helpername: helper
      });
    }
  }]);

  return HandlebarsMock;
}();

test('Test Partials registration for options passed as string', function () {
  var handlebarsMock = new HandlebarsMock();
  new _partials.default(handlebarsMock, {
    partials: 'src/testfiles/partials/partialA.js',
    partialNamer: _utils.defaultNamer
  });
  expect(handlebarsMock.partials[0].helpername).toEqual('partials/partialA');
});
test('Test Helper registration for options passed as array', function () {
  var handlebarsMock = new HandlebarsMock();
  new _partials.default(handlebarsMock, {
    partials: ['src/testfiles/partials/partialA.js', 'src/testfiles/partials/partialB.js'],
    partialNamer: _utils.defaultNamer
  });
  expect(handlebarsMock.partials[0].helpername).toEqual('partials/partialA');
  expect(handlebarsMock.partials[1].helpername).toEqual('partials/partialB');
});
test('Test adding partials dependencies', function () {
  var handlebarsMock = new HandlebarsMock();
  var loaderMock = {
    dependencies: [],
    dependency: function dependency(_dependency) {
      this.dependencies.push(_dependency);
    }
  };
  var partialsHelper = new _partials.default(handlebarsMock, {
    partials: ['src/testfiles/partials/partialA.js', 'src/testfiles/partials/partialB.js'],
    partialNamer: _utils.defaultNamer
  }, loaderMock);
  partialsHelper.addDependencies();
  expect(loaderMock.dependencies[0]).toEqual(_path.default.resolve('src/testfiles/partials/partialA.js'));
  expect(loaderMock.dependencies[1]).toEqual(_path.default.resolve('src/testfiles/partials/partialB.js'));
});
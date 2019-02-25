"use strict";

var _data = _interopRequireDefault(require("./data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global expect */
test('Test Data handling for options passed as string', function () {
  var data = new _data.default(null, {
    data: 'src/testfiles/data/en.json'
  });
  expect(data.languages[0].name).toEqual('en');
});
test('Test Data handling for options passed as array', function () {
  var data = new _data.default(null, {
    data: ['src/testfiles/data/en.json', 'src/testfiles/data/de.json']
  });
  expect(data.languages[0].name).toEqual('en');
  expect(data.languages[1].name).toEqual('de');
});
test('Test Data handling with global data', function () {
  var data = new _data.default(null, {
    data: ['src/testfiles/data/en.json', 'src/testfiles/data/de.json', 'src/testfiles/data/_global.json']
  });
  expect(data.data.length).toEqual(1);
});
test('Test adding data dependencies', function () {
  var loaderMock = {
    dependencies: [],
    dependency: function dependency(_dependency) {
      this.dependencies.push(_dependency);
    }
  };
  var data = new _data.default(null, {
    data: ['src/testfiles/data/en.json', 'src/testfiles/data/de.json', 'src/testfiles/data/_global.json']
  }, loaderMock);
  data.addDependencies();
  expect(loaderMock.dependencies[0]).toEqual('src/testfiles/data/en.json');
  expect(loaderMock.dependencies[1]).toEqual('src/testfiles/data/de.json');
  expect(loaderMock.dependencies[2]).toEqual('src/testfiles/data/_global.json');
});
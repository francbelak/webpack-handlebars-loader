'use strict';

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Test Data init', function () {
  var data = new _data2.default(null, {
    data: 'src/testfiles/data/en.json'
  });

  expect(data.initialized).toEqual(true);
}); /* global expect */


test('Test Data handling for options passed as string', function () {
  var data = new _data2.default(null, {
    data: 'src/testfiles/data/en.json'
  });

  expect(data.languages[0].name).toEqual('en');
});

test('Test Data handling for options passed as array', function () {
  var data = new _data2.default(null, {
    data: ['src/testfiles/data/en.json', 'src/testfiles/data/de.json']
  });

  expect(data.languages[0].name).toEqual('en');
  expect(data.languages[1].name).toEqual('de');
});

test('Test Data handling with global data', function () {
  var data = new _data2.default(null, {
    data: ['src/testfiles/data/en.json', 'src/testfiles/data/de.json', 'src/testfiles/data/_global.json']
  });

  expect(data.data.length).toEqual(1);
});
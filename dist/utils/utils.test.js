"use strict";

var _utils = require("./utils.js");

/* global expect */
test('Remove JS extension from file', function () {
  expect((0, _utils.removeExtension)('dist/js/main.js')).toEqual('dist/js/main');
});
test('Expect relative path to be in root depth', function () {
  expect((0, _utils.getRelativePath)('dist/index.html')).toEqual('./');
});
test('Expect relative path to be in language depth', function () {
  expect((0, _utils.getRelativePath)('dist/de/index.html')).toEqual('../');
});
test('Test defaultNamer to use folder and name', function () {
  expect((0, _utils.defaultNamer)('folder/dist/main.js')).toEqual('dist/main');
});
test('Remove helper string from name in register by default', function () {
  expect((0, _utils.defaultHelperNamer)('src/js/helpers/concat.helper.js')).toEqual('helpers/concat');
});
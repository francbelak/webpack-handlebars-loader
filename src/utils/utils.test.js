/* global expect */
import { removeExtension, getRelativePath, defaultNamer, defaultHelperNamer, getExtension } from './utils.js';

test('Remove JS extension from file', () => {
  expect(removeExtension('dist/js/main.js')).toEqual('dist/js/main');
});

test('Expect relative path to be in root depth', () => {
  expect(getRelativePath('dist/index.html')).toEqual('./');
});

test('Expect relative path to be in language depth', () => {
  expect(getRelativePath('dist/de/index.html')).toEqual('../');
});

test('Test defaultNamer to use folder and name', () => {
  expect(defaultNamer('folder/dist/main.js')).toEqual('dist/main');
});

test('Remove helper string from name in register by default', () => {
  expect(defaultHelperNamer('src/js/helpers/concat.helper.js')).toEqual('helpers/concat');
});

test('Get optional file extension', () => {
  expect(getExtension(false)).toEqual('');
  expect(getExtension({})).toEqual('');
  expect(getExtension('.html')).toEqual('.html');
  expect(getExtension('html')).toEqual('.html');
});
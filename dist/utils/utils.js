'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function defaultHelperNamer(file) {
  return defaultNamer(file).replace('.helper', '');
}

function defaultNamer(file) {
  var segments = file.split('/');
  return removeExtension(`${segments[segments.length - 2]}/${segments[segments.length - 1]}`);
}

function getRelativePath(path) {
  var deep = path.split('/').length - 2;
  var rootLayer = 0;
  if (deep === rootLayer) {
    return './';
  }
  return '../'.repeat(deep);
}

function removeExtension(path) {
  return path.slice(0, path.lastIndexOf('.'));
}

exports.defaultHelperNamer = defaultHelperNamer;
exports.defaultNamer = defaultNamer;
exports.getRelativePath = getRelativePath;
exports.removeExtension = removeExtension;
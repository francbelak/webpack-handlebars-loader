'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function defaultHelperNamer(file) {
  return defaultNamer(file).replace('.helper', '');
}

function defaultNamer(file) {
  var fileStart = file.lastIndexOf('/') + 1;
  var basePath = file.substr(0, fileStart - 1);
  var folderStart = basePath.lastIndexOf('/') + 1;
  var fileName = file.substr(fileStart);
  var folderName = basePath.substr(folderStart);
  return removeExtension(`${folderName}/${fileName}`);
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
function defaultHelperNamer(file) {
  return defaultNamer(file).replace('.helper', '');
}

function defaultNamer(file) {
  const segments = file.split('/');
  return removeExtension(`${segments[segments.length - 2]}/${segments[segments.length - 1]}`);
}

function getRelativePath(path) {
  const deep = path.split('/').length - 2;
  const rootLayer = 0;
  if (deep === rootLayer) {
    return './';
  }
  return '../'.repeat(deep);
}

function removeExtension(path) {
  return path.slice(0, path.lastIndexOf('.'));
}

function getExtension(extension = '') {
  if (typeof extension !== 'string' || extension === '') {
    return '';
  }
  if (extension.substr(0,1) !== '.') {
    extension = `.${extension}`;
  }
  return extension;
}

export {
  defaultHelperNamer,
  defaultNamer,
  getRelativePath,
  removeExtension,
  getExtension
};

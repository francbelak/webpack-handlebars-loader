function defaultHelperNamer(file) {
  return defaultNamer(file).replace('.helper', '');
}

function defaultNamer(file) {
  const fileStart = file.lastIndexOf('/') + 1;
  const basePath = file.substr(0, fileStart - 1);
  const folderStart = basePath.lastIndexOf('/') + 1;
  const fileName = file.substr(fileStart);
  const folderName = basePath.substr(folderStart);
  return removeExtension(`${folderName}/${fileName}`);
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

export {
  defaultHelperNamer,
  defaultNamer,
  getRelativePath,
  removeExtension
};

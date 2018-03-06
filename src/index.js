const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const Handlebars = require('handlebars');
const merge = require('lodash.merge');

let initializedPartials = false;
let initializedHelpers = false;
let initializedData = false;
const _data = [];
const languages = [];

function removeExtension(path) {
  return path.slice(0, path.lastIndexOf('.'));
}

function getRelativePath(path) {
  const deep = path.split('/').length - 2;
  const rootLayer = 0;
  if (deep === rootLayer) {
    return './';
  }
  return '../'.repeat(deep);
}

function loadPartials(context, options){
  if (!initializedPartials) {
    let partials;
    if (typeof options.partials === 'string') {
      partials = [options.partials];
    } else {
      partials = options.partials;
    }
    partials.forEach(partialGlob => {
      glob.sync(partialGlob).forEach(partial => {
        const partialName = options.partialNamer.call(context, partial);
        const partialPath = path.resolve(partial);
        context.addDependency(partialPath);
        Handlebars.registerPartial(partialName, fs.readFileSync(partialPath, 'utf-8'));
      });
    });
    initializedPartials = true;
  }
}

function loadHelpers(context, options) {
  if (!initializedHelpers) {
    let helpers;
    if (typeof options.helpers === 'string') {
      helpers = [options.helpers];
    }
    else {
      helpers = options.helpers;
    }
    helpers.forEach(helperGlob => {
      glob.sync(helperGlob).forEach(helper => {
        const helperName = options.helperNamer.call(context, helper);
        const helperPath = path.resolve(helper);
        context.addDependency(helperPath);
        delete require.cache[require.resolve(helperPath)];
        Handlebars.registerHelper(helperName, require(helperPath))
      })
    });
    initializedHelpers = true;
  }
}

function loadData(context, options) {
  if (!initializedData) {
    let dataFiles;
    if (typeof options.data === 'string') {
      dataFiles = [options.data];
    }
    else {
      dataFiles = options.data;
    }
    dataFiles.forEach(dataGlob => {
      glob.sync(dataGlob).forEach(dataObj => {
        const dataName = removeExtension(dataObj.substr(dataObj.lastIndexOf('/') + 1));
        const dataPath = path.resolve(dataObj);
        context.addDependency(dataPath);
        if (dataName.indexOf('_') === 0) {
          _data.push(JSON.parse(fs.readFileSync(dataObj)));
          return;
        }
        languages.push({
          name: dataName,
          data: JSON.parse(fs.readFileSync(dataObj, 'utf8'))
        });
      })
    });
    initializedData = true;
  }
}

function defaultNamer(file) {
  const fileStart = file.lastIndexOf('/') + 1;
  const basePath = file.substr(0, fileStart - 1);
  const folderStart = basePath.lastIndexOf('/') + 1;
  const fileName = file.substr(fileStart);
  const folderName = basePath.substr(folderStart);
  return removeExtension(`${folderName}/${fileName}`);
}

function defaultHelperNamer(file) {
  return defaultNamer(file).replace('.helper', '');
}

module.exports = function(source, map) {

  const options = Object.assign({}, {
    partialNamer: defaultNamer,
    helperNamer: defaultHelperNamer
  }, loaderUtils.getOptions(this));

  if (options.partials) {
    loadPartials(this, options);
  }

  if (options.helpers) {
    loadHelpers(this, options);
  }

  if (options.data) {
    loadData(this, options);
  }

  languages.forEach((language)=>{
    let languagePath = `/${language.name}`;
    if (language.name === options['rootData']) {
      languagePath = '';
    }

    let data = _data.reduce((reducedData, dataObject) => merge(reducedData, dataObject), {});
    const relativePath = `${options['outputpath']}${languagePath}${removeExtension(this.resourcePath.substr(this.resourcePath.indexOf(options['relativePathTo']) + options['relativePathTo'].length))}.html`;
    data = merge(data, language.data);

    data.absRefPrefix = getRelativePath(relativePath);
    const template = Handlebars.compile(source);
    const result = template(data);
    this.emitFile(relativePath, result);
  });

  //TODO: use better return value for testing
  return 'true';
};

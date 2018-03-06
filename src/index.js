const loaderUtils = require('loader-utils');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
let initializedPartials = false;
let initializedData = false;
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

module.exports = function(source, map) {
  const options = loaderUtils.getOptions(this);

  if (!initializedPartials) {
    //TODO: implement recursive readdir for nested partials support
    //TODO: implement watch partial changes and rebuild
    const partials = fs.readdirSync(path.join(__dirname, options['partials']));
    const partialsFolderName = options['partials'].substr(options['partials'].lastIndexOf('/') + 1);
    const partialsPath = `${options['partials']}/`;
    partials.forEach((partial) => {
      //Remove *.handlebars *.hbs in key
      const partialKey = removeExtension(partial);
      Handlebars.registerPartial(`${partialsFolderName}/${partialKey}`, fs.readFileSync(path.join(__dirname, partialsPath + partial), 'utf8'));
    });
    initializedPartials = true;
  }

  //TODO: implement watch data changes and rebuild
  if (!initializedData) {
    const data = fs.readdirSync(path.join(__dirname, options['data']));
    data.forEach((data) => {
      if (data.indexOf('_') === 0) {
        return;
      }
      languages.push(removeExtension(data));
    });
    initializedData = true;
  }

  languages.forEach((language)=>{
    let languagePath = `/${language}`;
    if (language === options['rootData']) {
      languagePath = '';
    }
    const relativePath = `${options['outputpath']}${languagePath}${removeExtension(this.resourcePath.substr(this.resourcePath.indexOf(options['relativePathTo']) + options['relativePathTo'].length))}.html`;
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, options['data'], `${language}.json`), 'utf8'));
    //TODO: implement lodash merge with _.data.json files
    data.absRefPrefix = getRelativePath(relativePath);
    const template = Handlebars.compile(source);
    const result = template(data);
    this.emitFile(relativePath, result);
  });

  //TODO: use better return value for testing
  return 'true';
};

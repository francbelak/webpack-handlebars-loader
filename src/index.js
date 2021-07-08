import { getOptions } from 'loader-utils';
import { defaultNamer, defaultHelperNamer, getRelativePath, removeExtension, getExtension } from './utils/utils';
import Handlebars from 'handlebars';
import Helpers from './utils/helpers';
import merge from 'lodash.merge';
import Partials from './utils/partials';
import Data from './utils/data';

let _data = [];
let languages = [];

/**
  * if options.extract is set to false --> object with markup will be returned
  * used if file is not being written (static) - markup can be loaded via JS
  * @type {object}
*/
let resultObject = {};

module.exports = function(source, map) {
  const options = Object.assign({}, {
    partialNamer: defaultNamer,
    helperNamer: defaultHelperNamer,
    extension: '.html'
  }, getOptions(this));

  if (options.partials) {
    const partials = new Partials(Handlebars, options, this);
    partials.addDependencies();
  }

  if (options.helpers) {
    const helpers = new Helpers(Handlebars, options, this);
    helpers.addDependencies();
  }

  if (options.data) {
    const data = new Data(Handlebars, options, this);
    data.addDependencies();
    _data = data.data;
    languages = data.languages;
  }

  languages.forEach((language)=>{
    const languageName = language.name;
    let languagePath = `/${languageName}`;
    if (languageName === options['rootData']) {
      languagePath = '';
    }

    let data = _data.reduce((reducedData, dataObject) => merge(reducedData, dataObject), {});
    const routeName = removeExtension(this.resourcePath.substr(this.resourcePath.indexOf(options['relativePathTo']) + options['relativePathTo'].length));
    const relativePath = `${options['outputpath']}${languagePath}${routeName}${getExtension(options.extension)}`;
    data = merge(data, language.data);

    data.absRefPrefix = getRelativePath(relativePath);
    data.language = languageName;

    /**
     * ignore absRefPrefix if files are not being written but loaded with JS
     */
    if (options.extract === false) {
      data.absRefPrefix = './';
    }

    const template = Handlebars.compile(source);
    const result = template(data);

    if(options.extract === false) {
      if (!resultObject[languageName]) {
        resultObject[languageName] = {};
      }
      resultObject[languageName][routeName] = result;
      return;
    }

    this.emitFile(relativePath, result);
  });

  if (options.extract === false) {
    return resultObject;
  }

  //TODO: use better return value for testing
  return 'true';
};

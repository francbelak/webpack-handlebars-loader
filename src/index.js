import { getOptions } from 'loader-utils';
import { defaultNamer, defaultHelperNamer, getRelativePath, removeExtension } from './utils/utils';
import Handlebars from 'handlebars';
import Helpers from './utils/helpers';
import merge from 'lodash.merge';
import Partials from './utils/partials';
import Data from './utils/data';

let initializedPartials = false;
let initializedHelpers = false;
let initializedData = false;

let _data = [];
let languages = [];

module.exports = function(source, map) {
  const options = Object.assign({}, {
    partialNamer: defaultNamer,
    helperNamer: defaultHelperNamer
  }, getOptions(this));

  if (options.partials && !initializedPartials) {
    const partials = new Partials(Handlebars, options);
    initializedPartials = partials.initialized;
  }

  if (options.helpers && !initializedHelpers) {
    const helpers = new Helpers(Handlebars, options);
    initializedPartials = helpers.initialized;
  }

  if (options.data && !initializedData) {
    const data = new Data(Handlebars, options);
    initializedData = data.initialized;
    _data = data.data;
    languages = data.languages;
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

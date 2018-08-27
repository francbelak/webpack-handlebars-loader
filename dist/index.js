'use strict';

var _loaderUtils = require('loader-utils');

var _utils = require('./utils/utils');

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _helpers = require('./utils/helpers');

var _helpers2 = _interopRequireDefault(_helpers);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _partials = require('./utils/partials');

var _partials2 = _interopRequireDefault(_partials);

var _data2 = require('./utils/data');

var _data3 = _interopRequireDefault(_data2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initializedPartials = false;
var initializedHelpers = false;
var initializedData = false;

var _data = [];
var languages = [];

/**
  * if options.extract is set to false --> object with markup will be returned
  * used if file is not being written (static) - markup can be loaded via JS
  * @type {object}
*/
var resultObject = {};

module.exports = function (source, map) {
  var _this = this;

  var options = Object.assign({}, {
    partialNamer: _utils.defaultNamer,
    helperNamer: _utils.defaultHelperNamer
  }, (0, _loaderUtils.getOptions)(this));

  if (options.partials && !initializedPartials) {
    var partials = new _partials2.default(_handlebars2.default, options);
    initializedPartials = partials.initialized;
  }

  if (options.helpers && !initializedHelpers) {
    var helpers = new _helpers2.default(_handlebars2.default, options);
    initializedPartials = helpers.initialized;
  }

  if (options.data && !initializedData) {
    var data = new _data3.default(_handlebars2.default, options);
    initializedData = data.initialized;
    _data = data.data;
    languages = data.languages;
  }

  languages.forEach(function (language) {
    var languageName = language.name;
    var languagePath = `/${languageName}`;
    if (languageName === options['rootData']) {
      languagePath = '';
    }

    var data = _data.reduce(function (reducedData, dataObject) {
      return (0, _lodash2.default)(reducedData, dataObject);
    }, {});
    var routeName = (0, _utils.removeExtension)(_this.resourcePath.substr(_this.resourcePath.indexOf(options['relativePathTo']) + options['relativePathTo'].length));
    var relativePath = `${options['outputpath']}${languagePath}${routeName}.html`;
    data = (0, _lodash2.default)(data, language.data);

    data.absRefPrefix = (0, _utils.getRelativePath)(relativePath);
    data.language = languageName;

    /**
     * ignore absRefPrefix if files are not being written but loaded with JS
     */
    if (options.extract === false) {
      data.absRefPrefix = './';
    }

    var template = _handlebars2.default.compile(source);
    var result = template(data);

    if (options.extract === false) {
      if (!resultObject[languageName]) {
        resultObject[languageName] = {};
      }
      resultObject[languageName][routeName] = result;
      return;
    }

    _this.emitFile(relativePath, result);
  });

  if (options.extract === false) {
    return resultObject;
  }

  //TODO: use better return value for testing
  return 'true';
};
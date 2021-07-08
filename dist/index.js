"use strict";

var _loaderUtils = require("loader-utils");

var _utils = require("./utils/utils");

var _handlebars = _interopRequireDefault(require("handlebars"));

var _helpers = _interopRequireDefault(require("./utils/helpers"));

var _lodash = _interopRequireDefault(require("lodash.merge"));

var _partials = _interopRequireDefault(require("./utils/partials"));

var _data2 = _interopRequireDefault(require("./utils/data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    helperNamer: _utils.defaultHelperNamer,
    extension: '.html'
  }, (0, _loaderUtils.getOptions)(this));

  if (options.partials) {
    var partials = new _partials.default(_handlebars.default, options, this);
    partials.addDependencies();
  }

  if (options.helpers) {
    var helpers = new _helpers.default(_handlebars.default, options, this);
    helpers.addDependencies();
  }

  if (options.data) {
    var data = new _data2.default(_handlebars.default, options, this);
    data.addDependencies();
    _data = data.data;
    languages = data.languages;
  }

  languages.forEach(function (language) {
    var languageName = language.name;
    var languagePath = "/".concat(languageName);

    if (languageName === options['rootData']) {
      languagePath = '';
    }

    var data = _data.reduce(function (reducedData, dataObject) {
      return (0, _lodash.default)(reducedData, dataObject);
    }, {});

    var routeName = (0, _utils.removeExtension)(_this.resourcePath.substr(_this.resourcePath.indexOf(options['relativePathTo']) + options['relativePathTo'].length));
    var relativePath = "".concat(options['outputpath']).concat(languagePath).concat(routeName).concat((0, _utils.getExtension)(options.extension));
    data = (0, _lodash.default)(data, language.data);
    data.absRefPrefix = (0, _utils.getRelativePath)(relativePath);
    data.language = languageName;
    /**
     * ignore absRefPrefix if files are not being written but loaded with JS
     */

    if (options.extract === false) {
      data.absRefPrefix = './';
    }

    var template = _handlebars.default.compile(source);

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
  } //TODO: use better return value for testing


  return 'true';
};
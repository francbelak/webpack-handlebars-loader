import glob from 'glob';
import path from 'path';

export default class Helpers {
  constructor(Handlebars, options) {
    this.initialized = true;
    let helpers = options.helpers;
    if (typeof options.helpers === 'string') {
      helpers = [options.helpers];
    }
    helpers.forEach(helperGlob => {
      glob.sync(helperGlob).forEach(helper => {
        const helperName = options.helperNamer(helper);
        const helperPath = path.resolve(helper);
        delete require.cache[require.resolve(helperPath)];
        Handlebars.registerHelper(helperName, require(helperPath));
      });
    });
  }
}

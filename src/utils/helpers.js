import glob from 'glob';
import path from 'path';

export default class Helpers {
  constructor(Handlebars, options, loaderContext) {
    this.loaderContext = loaderContext;
    this.helpers = options.helpers;
    if (typeof options.helpers === 'string') {
      this.helpers = [options.helpers];
    }
    this.helpers.forEach(helperGlob => {
      glob.sync(helperGlob).forEach(helper => {
        const helperName = options.helperNamer(helper);
        const helperPath = path.resolve(helper);
        delete require.cache[require.resolve(helperPath)];
        Handlebars.registerHelper(helperName, require(helperPath));
      });
    });
  }
  addDependencies() {
    this.helpers.forEach(helperGlob => {
      glob.sync(helperGlob).forEach(helper => {
        this.loaderContext.dependency(path.resolve(helper));
      });
    });
  }
}

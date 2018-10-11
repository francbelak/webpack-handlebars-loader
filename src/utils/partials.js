import fs from 'fs';
import glob from 'glob';
import path from 'path';

export default class Partials {
  constructor(Handlebars, options, loaderContext) {
    this.loaderContext = loaderContext;
    this.partials = options.partials;

    if (typeof this.partials === 'string') {
      this.partials =  [this.partials];
    }

    this.partials.forEach(partialGlob => {
      glob.sync(partialGlob).forEach(partial => {
        const partialName = options.partialNamer(partial);
        const partialPath = path.resolve(partial);
        Handlebars.registerPartial(partialName, fs.readFileSync(partialPath, 'utf-8'));
      });
    });
  }
  addDependencies() {
    this.partials.forEach(partialGlob => {
      glob.sync(partialGlob).forEach(partial => {
        this.loaderContext.dependency(path.resolve(partial));
      });
    });
  }
}

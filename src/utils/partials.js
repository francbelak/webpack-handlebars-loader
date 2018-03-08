import fs from 'fs';
import glob from 'glob';
import path from 'path';

export default class Partials {
  constructor(Handlebars, options) {
    this.initialized = true;
    let partials = options.partials;
    if (typeof options.partials === 'string') {
      partials = [options.partials];
    }
    partials.forEach(partialGlob => {
      glob.sync(partialGlob).forEach(partial => {
        const partialName = options.partialNamer(partial);
        const partialPath = path.resolve(partial);
        Handlebars.registerPartial(partialName, fs.readFileSync(partialPath, 'utf-8'));
      });
    });
  }
}

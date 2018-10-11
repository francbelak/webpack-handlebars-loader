import fs from 'fs';
import glob from 'glob';
import { removeExtension } from './utils';

export default class Data {
  constructor(Handlebars, options, loaderContext) {
    this.languages = [];
    this.data = [];
    this.loaderContext = loaderContext;
    this.dataFiles = options.data;
    if (typeof options.data === 'string') {
      this.dataFiles = [options.data];
    }
    this.dataFiles.forEach(dataGlob => {
      glob.sync(dataGlob).forEach(dataObj => {
        const dataName = removeExtension(dataObj.substr(dataObj.lastIndexOf('/') + 1));
        if (dataName.indexOf('_') === 0) {
          this.data.push(JSON.parse(fs.readFileSync(dataObj)));
          return;
        }
        this.languages.push({
          name: dataName,
          data: JSON.parse(fs.readFileSync(dataObj, 'utf8'))
        });
      });
    });
  }
  addDependencies() {
    this.dataFiles.forEach(dataGlob => {
      glob.sync(dataGlob).forEach(dataObj => {
        this.loaderContext.dependency(dataObj);
      });
    });
  }
}

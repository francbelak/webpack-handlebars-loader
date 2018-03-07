import fs from 'fs';
import glob from 'glob';
import { removeExtension } from './utils';

export default class Data {
  constructor(Handlebars, options) {
    this.initialized = true;
    this.languages = [];
    this.data = [];
    let dataFiles = options.data;
    if (typeof options.data === 'string') {
      dataFiles = [options.data];
    }
    dataFiles.forEach(dataGlob => {
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
}

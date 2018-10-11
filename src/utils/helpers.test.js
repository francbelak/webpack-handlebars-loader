/* global expect */
import Helpers from './helpers';
import { defaultNamer } from './utils';
import path from 'path';

class HandlebarsMock {
  constructor() {
    this.helpers = [];
  }
  registerHelper(helper) {
    this.helpers.push({
      helpername: helper
    });
  }
}

test('Test Helper registration for options passed as string', () => {
  const handlebarsMock = new HandlebarsMock();
  new Helpers(handlebarsMock, {
    helpers: 'src/testfiles/helpers/helperA.js',
    helperNamer: defaultNamer
  });

  expect(handlebarsMock.helpers[0].helpername).toEqual('helpers/helperA');
});

test('Test Helper registration for options passed as array', () => {
  const handlebarsMock = new HandlebarsMock();
  new Helpers(handlebarsMock, {
    helpers: [
      'src/testfiles/helpers/helperA.js',
      'src/testfiles/helpers/helperB.js'
    ],
    helperNamer: defaultNamer
  });

  expect(handlebarsMock.helpers[0].helpername).toEqual('helpers/helperA');
  expect(handlebarsMock.helpers[1].helpername).toEqual('helpers/helperB');
});

test('Test adding partials dependencies', () => {
  const handlebarsMock = new HandlebarsMock();
  const loaderMock = {
    dependencies: [],
    dependency: function(dependency) {
      this.dependencies.push(dependency);
    }
  };

  const helpers = new Helpers(handlebarsMock, {
    helpers: [
      'src/testfiles/helpers/helperA.js',
      'src/testfiles/helpers/helperB.js'
    ],
    helperNamer: defaultNamer
  }, loaderMock);

  helpers.addDependencies();

  expect(loaderMock.dependencies[0]).toEqual(path.resolve('src/testfiles/helpers/helperA.js'));
  expect(loaderMock.dependencies[1]).toEqual(path.resolve('src/testfiles/helpers/helperB.js'));
});

/* global expect */
import Helpers from './helpers';
import { defaultNamer } from './utils';

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

test('Test Helper init', () => {
  const handlebarsMock = new HandlebarsMock();
  const helper = new Helpers(handlebarsMock, {
    helpers: 'src/testfiles/helpers/helperA.js',
    helperNamer: defaultNamer
  });

  expect(helper.initialized).toEqual(true);
});

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

/* global expect */
import Partials from './partials';
import { defaultNamer } from './utils';
import path from 'path';

class HandlebarsMock {
  constructor() {
    this.partials = [];
  }
  registerPartial(helper) {
    this.partials.push({
      helpername: helper
    });
  }
}

test('Test Partials registration for options passed as string', () => {
  const handlebarsMock = new HandlebarsMock();
  new Partials(handlebarsMock, {
    partials: 'src/testfiles/partials/partialA.js',
    partialNamer: defaultNamer
  });

  expect(handlebarsMock.partials[0].helpername).toEqual('partials/partialA');
});

test('Test Helper registration for options passed as array', () => {
  const handlebarsMock = new HandlebarsMock();
  new Partials(handlebarsMock, {
    partials: [
      'src/testfiles/partials/partialA.js',
      'src/testfiles/partials/partialB.js'
    ],
    partialNamer: defaultNamer
  });

  expect(handlebarsMock.partials[0].helpername).toEqual('partials/partialA');
  expect(handlebarsMock.partials[1].helpername).toEqual('partials/partialB');
});

test('Test adding partials dependencies', () => {
  const handlebarsMock = new HandlebarsMock();
  const loaderMock = {
    dependencies: [],
    dependency: function(dependency) {
      this.dependencies.push(dependency);
    }
  };

  const partialsHelper = new Partials(handlebarsMock, {
    partials: [
      'src/testfiles/partials/partialA.js',
      'src/testfiles/partials/partialB.js'
    ],
    partialNamer: defaultNamer
  }, loaderMock);

  partialsHelper.addDependencies();

  expect(loaderMock.dependencies[0]).toEqual(path.resolve('src/testfiles/partials/partialA.js'));
  expect(loaderMock.dependencies[1]).toEqual(path.resolve('src/testfiles/partials/partialB.js'));
});

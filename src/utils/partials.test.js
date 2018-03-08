/* global expect */
import Partials from './partials';
import { defaultNamer } from './utils';

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

test('Test Partial init', () => {
  const handlebarsMock = new HandlebarsMock();
  const partial = new Partials(handlebarsMock, {
    partials: 'src/testfiles/partials/partialA.js',
    partialNamer: defaultNamer
  });

  expect(partial.initialized).toEqual(true);
});

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

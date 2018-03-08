/* global expect */
import Data from './data';

test('Test Data init', () => {
  const data = new Data(null, {
    data: 'src/testfiles/data/en.json'
  });

  expect(data.initialized).toEqual(true);
});

test('Test Data handling for options passed as string', () => {
  const data = new Data(null, {
    data: 'src/testfiles/data/en.json'
  });

  expect(data.languages[0].name).toEqual('en');
});

test('Test Data handling for options passed as array', () => {
  const data = new Data(null, {
    data: [
      'src/testfiles/data/en.json',
      'src/testfiles/data/de.json',
    ]
  });

  expect(data.languages[0].name).toEqual('en');
  expect(data.languages[1].name).toEqual('de');
});

test('Test Data handling with global data', () => {
  const data = new Data(null, {
    data: [
      'src/testfiles/data/en.json',
      'src/testfiles/data/de.json',
      'src/testfiles/data/_global.json',
    ]
  });

  expect(data.data.length).toEqual(1);
});

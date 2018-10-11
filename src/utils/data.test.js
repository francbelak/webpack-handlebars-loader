/* global expect */
import Data from './data';

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

test('Test adding data dependencies', () => {
  const loaderMock = {
    dependencies: [],
    dependency: function(dependency) {
      this.dependencies.push(dependency);
    }
  };

  const data = new Data(null, {
    data: [
      'src/testfiles/data/en.json',
      'src/testfiles/data/de.json',
      'src/testfiles/data/_global.json',
    ]
  }, loaderMock);

  data.addDependencies();

  expect(loaderMock.dependencies[0]).toEqual('src/testfiles/data/en.json');
  expect(loaderMock.dependencies[1]).toEqual('src/testfiles/data/de.json');
  expect(loaderMock.dependencies[2]).toEqual('src/testfiles/data/_global.json');
});

import resolvers from './index';

const forEachEntry = (object, callback) => {
  Object.entries(object).forEach(([key, value]) => {
    callback(value, key);
  })
}


test('resolvers exist', () => {
  expect(resolvers).not.toBeNull();
})

test('resolvers dont crash', () => {
  forEachEntry(resolvers, (resolver, key) => {
    forEachEntry(resolver, (func) => {
      func();
    })
  })
})

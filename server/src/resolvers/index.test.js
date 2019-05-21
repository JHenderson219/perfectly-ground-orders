import resolvers from './index';

const forEachEntry = (object, callback) => {
  Object.entries(object).forEach(([key, value]) => {
    callback(value, key);
  })
}


test('resolvers exist', () => {
  expect(resolvers).not.toBeNull();
})

const mockParent = {
  get: jest.fn(),
}
const mockFindAll = jest.fn()
const mockCreate = jest.fn()
const MockModel = jest.fn().mockImplementation(() => {
  return {
    findAll: mockFindAll,
    create: mockCreate,
  }
})
const mockContext = {
  models: {
    brewMethod: new MockModel,
    coffee: new MockModel,
    caseType: new MockModel,
    workOrder: new MockModel,
  }
}

describe('resolvers', () => {
  test('resolvers dont crash', () => {
    forEachEntry(resolvers, (resolver, key) => {
      forEachEntry(resolver, (func) => {
        func(mockParent, {}, mockContext);
      })
    })
  })
})


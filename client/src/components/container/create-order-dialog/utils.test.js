import { dateIsValid, validateForm, formatData, handleSave } from './utils';
import wait from 'waait';
describe('dateIsValid', () => {
  describe('given a properly formatted date string', () => {
    it('returns true', () => {
      const date = '2019-01-01';
      expect(dateIsValid(date)).toBe(true);
    })
  })
  describe('given an improperly formatted string', () => {
    it('returns false', () => {
      const badDate = '2asdfghj';
      expect(dateIsValid(badDate)).toBe(false);
    })
  })
})

describe('validateForm', () => {
  const data = {
    shipDate: '2019-01-01',
    cases: 10,
    brewMethodID: '036b794b-7ce0-40ed-aa68-46082a8abba9',
    coffeeID: '036b794b-7ce0-40ed-aa68-46082a8abba9',
    caseTypeID: '036b794b-7ce0-40ed-aa68-46082a8abba9'
  }
  describe('given valid data', () => {
    it('returns no errors', () => {
      expect(validateForm(data)).toEqual({});
    })
  })
  describe('given any invalid data', () => {
    it('returns some errors', () => {
      const badData = Object.assign({}, data, {shipDate: -1});
      expect(validateForm(badData)).not.toEqual({});
    })
  })
  describe('missing any one property excp', () => {
    it('returns an error for that property', () => {
      Object.entries(data).forEach(([key, value]) => {
        const testData = Object.assign({}, data);
        delete testData[key];
        const errors = validateForm(testData);
        expect(errors[key]).not.toBeNull();
      })
    })
  })
})

describe('formatData', () => {
  it('runs without crashing', () => {
    formatData();
  })
  it('doesnt return null', () => {
    expect(formatData()).not.toBeNull();
  })
  it('returns an object of iterables with map functions', () => {
    const formattedData = formatData();
    for(let key in formattedData) {
      const value = formattedData[key];
      expect(value).toHaveLength(0);
    }
  })
  it('returns an object of objects wit map functions', () => {
    const formattedData = formatData();
    for(let key in formattedData) {
      const value = formattedData[key];
      expect(value.map).not.toBeNull();
    }
  })
})

describe('handleSave', () => {
  it('returns a function', () => {
    expect(typeof handleSave()).toBe('function');
  })
  const mocks = {
    action: jest.fn().mockResolvedValue(),
    onSave: jest.fn(),
    onError: jest.fn(),
  }
  describe('given an action that succeeds', () => {
    const mockSuccessfulSave = handleSave(mocks.action, mocks.onSave, mocks.onError);
    it('calls the action and the onSave', async () => {
      mockSuccessfulSave();
      expect(mocks.action).toHaveBeenCalled();
      await wait(0);
      expect(mocks.onSave).toHaveBeenCalled();
    })
    
  })
  describe('given an action that fails', () => {
    const mockFailedAction = jest.fn().mockRejectedValue(false);
    const mockFailedSave = handleSave(mockFailedAction, mocks.onSave, mocks.onError);
    it('calls onError', async () => {
      mockFailedSave();
      await wait(0)
      expect(mocks.onError).toHaveBeenCalled();
    })
  })
})
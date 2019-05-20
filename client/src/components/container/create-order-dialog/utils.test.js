import { dateIsValid, validateForm } from './utils';

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
    notes: 'some harmless notes',
    caseTypeID: '036b794b-7ce0-40ed-aa68-46082a8abba9'
  }
  describe('given valid data', () => {
    it('returns no errors', () => {
      expect(validateForm(data)).toEqual({});
    })
  })
  describe('given invalid data', () => {
    it('returns some errors', () => {
      const badData = Object.assign({}, data, {shipDate: -1});
      expect(validateForm(badData)).not.toEqual({});
    })
  })
})
import { sanitizeCreateWorkOrder, getOneByID } from './utils';
import wait from 'waait';

describe('sanitizeCreateWorkOrder', () => {
  it('sanitizes a dirty notes field', () => {
    const dirty = {
      notes: '<script>alert("xss");</script>'
    }
    const clean = {
      notes: '&lt;script&gt;alert("xss");&lt;/script&gt;'
    }
    const sanitized = sanitizeCreateWorkOrder(dirty);
    expect(sanitized).toEqual(clean);
  })
  it('doesnt alter any other fields', () => {
    const clean = {
      notes: 'some string',
      brewMethodID: 'id here',
    }
    expect(sanitizeCreateWorkOrder(clean)).toEqual(clean);
  })
})

describe('getOneByID', () => {
  const mock = {
    findOne: jest.fn(),
  }
  const arg = {
    where: {
      id: 'testID'
    }
  }
  it('calls findOne on the model with a provided ID', () => {
    getOneByID(mock, arg.where.id);
    wait(0);
    expect(mock.findOne).toHaveBeenCalledWith(arg);
  })
})

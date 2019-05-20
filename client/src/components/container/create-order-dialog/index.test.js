import { mount } from 'enzyme';
import React from 'react';
import { smokeTest } from './../../___tests___/utils'
import CreateWorkOrderWrapper, { CreateWorkOrderDialog } from './index';

describe('CreateWorkOrderDialog', () => {
  it('rendersWithoutCrashing', () => {
    smokeTest(CreateWorkOrderDialog);
  })
  describe('given no data', () => {
    it('returns null', () => {
      const wrapper = mount(<CreateWorkOrderDialog />);
      expect(wrapper.html()).toBeNull();
    })
  })
})

describe('CreateWorkOrderWrapper', () => {
  it('rendersWithoutCrashing', () => {
    smokeTest(CreateWorkOrderWrapper);
  })
})
import { mount } from 'enzyme';
import CreateOrderForm from './index';
import React from 'react';
import { smokeTest } from '../../___tests___/utils'



describe('CreateOrderForm', () => {
  it('renders without crashing', () => {
    smokeTest(CreateOrderForm);
  })

})


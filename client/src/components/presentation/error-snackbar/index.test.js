import { shallow, mount } from 'enzyme';
import ErrorSnackbar from './index';
import React from 'react';
import { smokeTest } from './../../___tests___/utils'
describe('Date', () => {
  it('renders without crashing', () => {
    smokeTest(ErrorSnackbar);
  })
  it('renders an error message', () => {
    const wrapper = mount(<ErrorSnackbar />);
  })
})
import { mount } from 'enzyme';
import Date from './index';
import React from 'react';
import { smokeTest } from './../../___tests___/utils'
import dayjs from 'dayjs';
describe('Date', () => {
  it('renders without crashing', () => {
    smokeTest(Date);
  })
  it('renders the current date', () => {
    const wrapper = mount(<Date />);
    const month = dayjs().format('MMM');
    const day = dayjs().format('D');
    expect(wrapper.contains(month)).toBe(true);
    expect(wrapper.contains(day)).toBe(true);
  })
})
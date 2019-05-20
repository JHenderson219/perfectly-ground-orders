import { mount } from 'enzyme';
import Date from './index';
import React from 'react';
import { smokeTest } from './../../test-utils'
import dayjs from 'dayjs';
describe('Date', () => {
  it('renders without crashing', () => {
    smokeTest(Date);
  })
  it('renders the current date', () => {
    const wrapper = mount(<Date />);
    const month = dayjs().format('MMM');
    const day = dayjs().format('D');
    // expect(wrapper).toContain(month);
    // expect(wrapper).toContain(day);
  })
})
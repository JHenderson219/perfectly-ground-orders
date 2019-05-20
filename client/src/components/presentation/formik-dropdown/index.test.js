import { shallow, mount } from 'enzyme';
import FormikDropdown from './index';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { smokeTest } from './../../test-utils'

const data = [
  {label: 'test1', value: 'test1'}, 
  {label: 'test2', value: 'test2'}];

describe('FormikDropdown', () => {

  it('renders without crashing', () => {
    smokeTest(FormikDropdown);
  })
  it('renders an item for each piece of data it gets', () => {
    const wrapper = shallow(<FormikDropdown data={data}n />);
    const found = wrapper.find(MenuItem);
    expect(found).toHaveLength(data.length);
  })
  it('doesnt render any items that dont have labels and values', () => {
    const localData = data.slice(0);
    localData.push({});
    const wrapper = shallow(<FormikDropdown data={localData} />);
    const found = wrapper.find(MenuItem);
    expect(found).toHaveLength(data.length);
  })
})
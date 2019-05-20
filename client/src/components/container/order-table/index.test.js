import { mount } from 'enzyme';
import Date from './index';
import React from 'react';
import { smokeTest } from './../../___tests___/utils'
import { OrdersTable } from './index';

describe('OrdersTable', () => {
  it('renders without crashing', () => {
    smokeTest(OrdersTable);
  })
  describe('given an error', () => {
    it('renders the error', () => {
      const withError =  {error: 'Test error'};
      const wrapper = mount(<OrdersTable result={withError} />)
      expect(wrapper.contains(withError.error));
    })
  })
  describe('given it is loading', () => {
    it('displays a loading placeholder', () => {
      const withLoading = {loading: true};
      const wrapper = mount(<OrdersTable result={withLoading} />)
      expect(wrapper.contains('Loading'));
    })
  })
  describe('given no data', () => {
    it('returns null', () => {
      const wrapper = mount(<OrdersTable />);
      expect(wrapper.html()).toBeNull()
    })
  })
  describe('given valid data', () => {
    it('renders successfully', () => {
      const withData = {data: [{key: 'value'}]};
      const wrapper = mount(<OrdersTable result={withData} />);
      expect(wrapper).toBeTruthy();
    })
  })
})
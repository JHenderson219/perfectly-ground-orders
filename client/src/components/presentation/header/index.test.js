import { shallow, mount } from 'enzyme';
import Header from './index';
import React from 'react';
import { smokeTest } from './../../___tests___/utils'

describe('Header', () => {
  it('renders without crashing', () =>{
    smokeTest(Header);
  })
})
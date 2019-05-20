import { shallow, mount } from 'enzyme';
import Header from './index';
import React from 'react';
import { smokeTest } from './../../test-utils'

describe('Header', () => {
  it('renders without crashing', () =>{
    smokeTest(Header);
  })
})
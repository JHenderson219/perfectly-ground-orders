import { shallow, mount } from 'enzyme';
import Logo from './index';
import React from 'react';
import { smokeTest } from './../../test-utils'

describe('Logo', () => {
  it('renders without crashing', () => {
    smokeTest(Logo);
  })
})
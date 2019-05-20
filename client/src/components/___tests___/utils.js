import React from 'react';
import { shallow } from 'enzyme';

export const smokeTest = (Component) => {
  shallow(<Component />);
}
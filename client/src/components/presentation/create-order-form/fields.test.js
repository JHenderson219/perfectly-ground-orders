import { shallow } from 'enzyme';
import React from 'react';
import { smokeTest } from '../../___tests___/utils'

import * as Fields from './fields';
const forEachField = (callback) => {
  Object.entries(Fields).forEach(([name, Field]) => {
    callback(Field, name);
  })
};
const withStyle = (Field) => {
  const style = {
    outerColumn: {},
    formColumn: {},
    formRow: {}
  }
  const wrapper = shallow(<Field style={style} />);
  expect(wrapper).not.toBeNull();
}
const tests = [
  {
    name: 'renders without crashing',
    callback: smokeTest
  },
  {
    name: 'renders when given a style object',
    callback: withStyle
  }
]

tests.forEach(test => {
  forEachField((Field, fieldName) => {
    describe(fieldName, () => {
      it(test.name, () => {
        test.callback(Field);
      })
    })
  })
})
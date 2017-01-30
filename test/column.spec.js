
import React from 'react'
import { shallow, mount } from 'enzyme'
import Column from '../src/column'

describe('Column', () => {
  describe('#render', () => {
    it('renders without an error', () => {
      mount(<Column />)
    })

    it('doesn\'t render any html tags', () => {
      const el = shallow((
        <Column />
      ))

      expect(el.type()).toBe(null)
    })
  })
})

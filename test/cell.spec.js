
import React from 'react'
import { shallow, mount } from 'enzyme'

import Cell from '../src/cell'
import Column from '../src/column'

describe('Column', () => {
  describe('#render', () => {
    it('renders without an error', () => {
      mount((
        <table>
          <tbody>
            <tr>
              <Cell
                column={<Column />}
                data={1} />
            </tr>
          </tbody>
        </table>
      ))
    })

    it('renders text from the `cell` property of a column', () => {
      const el = shallow((
        <Cell
          column={<Column cell={row => 'Hi'} />}
          data={1} />
      ))

      expect(el.text()).toBe('Hi')
    })

    it('renders a property using the `cellKey` shorthand', () => {
      const el = shallow((
        <Cell
          column={<Column cellKey="foo" />}
          data={{ foo: 'Hi' }} />
      ))

      expect(el.text()).toBe('Hi')
    })

    it('renders nothing when `cellKey` calls a property that does not exist', () => {
      const el = shallow((
        <Cell
          column={<Column cellKey="dawg" />}
          data={{ foo: 'Hi' }} />
      ))

      expect(el.text()).toBe('')
    })
  })
})

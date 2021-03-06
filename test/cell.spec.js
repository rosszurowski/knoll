
import React from 'react'
import { shallow, mount } from 'enzyme'

import Cell from '../src/cell'
import Column from '../src/column'

describe('Cell', () => {
  describe('#render', () => {
    it('renders without an error', () => {
      mount((
        <table>
          <tbody>
            <tr>
              <Cell
                component="td"
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
          component="td"
          column={<Column cell={row => 'Hi'} />}
          data={1} />
      ))

      expect(el.text()).toBe('Hi')
    })

    it('renders a property using the `cellKey` shorthand', () => {
      const el = shallow((
        <Cell
          component="td"
          column={<Column cellKey="foo" />}
          data={{ foo: 'Hi' }} />
      ))

      expect(el.text()).toBe('Hi')
    })

    it('renders nothing when `cellKey` calls a property that does not exist on an object', () => {
      const el = shallow((
        <Cell
          component="td"
          column={<Column cellKey="dawg" />}
          data={{ foo: 'Hi' }} />
      ))

      expect(el.text()).toBe('')
    })

    it('renders nothing when `cellKey` calls a property for a non-object', () => {
      const el = shallow((
        <Cell
          component="td"
          column={<Column cellKey="dawg" />}
          data={5} />
      ))

      expect(el.text()).toBe('')
    })
  })
})

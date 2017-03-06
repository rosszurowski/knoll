
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Table from '../src/table'
import Column from '../src/column'

describe('Table', () => {
  describe('#render', () => {
    it('renders without an error', () => {
      mount(<Table data={[]} />)
    })

    it('renders a row for each item in `data`', () => {
      const el = mount((
        <Table data={[1, 2, 3]}>
          <Column cell={val => val} />
        </Table>
      ))

      expect(el.find('tr')).toHaveLength(3)
    })

    it('does not render data without columns', () => {
      const el = shallow(<Table data={[1, 2, 3]} />)
      expect(el.find('tr')).toHaveLength(0)
    })

    it('render headers for columns', () => {
      const el = render((
        <Table data={[1, 2, 3]}>
          <Column header="A" />
          <Column header="B" />
        </Table>
      ))

      expect(el.find('thead')).toHaveLength(1)
      expect(el.find('th')).toHaveLength(2)
    })

    it('renders headers as nodes', () => {
      const el = mount((
        <Table data={[1, 2, 3]}>
          <Column header={<h2>A</h2>} />
          <Column header={<h2>B</h2>} />
        </Table>
      ))

      expect(el.contains(<h2>A</h2>)).toBeTruthy()
      expect(el.contains(<h2>B</h2>)).toBeTruthy()
    })

    it('adds the onRowClick handler when set', () => {
      const fn = jest.fn()
      const data = [{ a: 5 }, { a: 9 }, { a: 6 }]
      const el = mount((
        <Table data={data} onRowClick={fn}>
          <Column header="A" cellKey="a" />
        </Table>
      ))
      const row = el.find('tbody tr').first()

      expect(fn.mock.calls.length).toEqual(0)
      row.simulate('click')
      expect(fn.mock.calls.length).toEqual(1)
      expect(fn.mock.calls[0]).toEqual([{ a: 5 }])
    })
  })
})

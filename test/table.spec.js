
import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { Table, Column } from '../src/index'

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
      const el = mount((
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
  })

  describe('custom components', () => {
    it('allows defining custom components', () => {
      const StyledTable = props => <div className="foo" {...props} />
      const StyledBody = props => <div className="body" {...props} />
      const StyledCell = props => <div className="cell" {...props} />
      const StyledRow = ({ row, ...props }) => <div className="row" {...props} />

      const components = {
        table: StyledTable,
        body: StyledBody,
        row: StyledRow,
        cell: StyledCell,
      }

      const data = [1, 2, 3]

      const el = mount((
        <Table components={components} data={data}>
          <Column cell={val => val} />
        </Table>
      ))

      expect(el.find(StyledTable)).toHaveLength(1)
      expect(el.find(StyledBody)).toHaveLength(1)
      expect(el.find(StyledRow)).toHaveLength(data.length)
      expect(el.find(StyledCell)).toHaveLength(data.length)
    })

    it('allows passing event handlers', () => {
      const fn = jest.fn()
      const fakeFn = jest.fn()

      const StyledRow = ({ row, ...props }) => <tr className="f" onClick={fakeFn} {...props} />

      const components = { row: StyledRow }
      const data = [{ a: 5 }, { a: 9 }, { a: 6 }]

      const el = mount((
        <Table components={components} data={data} onRowClick={fn}>
          <Column header="A" cell={row => row.a} />
        </Table>
      ))

      const row = el.find(StyledRow).first()

      expect(row).toHaveLength(1)
      expect(fn.mock.calls).toHaveLength(0)
      row.simulate('click')
      expect(fn.mock.calls).toHaveLength(1)
      expect(fakeFn.mock.calls).toHaveLength(0)
      expect(fn.mock.calls[0]).toEqual([{ a: 5 }])
    })

    describe('row', () => {
      it('provides the row\'s data as a prop', () => {
        const Row = ({ row, ...props }) => (
          <a href={`/item/${row.id}`} {...props} />
        )

        const components = {
          table: 'div',
          header: 'div',
          headerRow: 'div',
          headerCell: 'div',
          body: props => <div className="body" {...props} />,
          row: Row,
          cell: 'div',
        }
        const data = [
          { id: 5, name: 'Foo' },
          { id: 6, name: 'Bar' },
          { id: 7, name: 'Baz' }
        ]

        const el = render((
          <Table components={components} data={data}>
            <Column header="Link" cellKey="name" />
          </Table>
        ))

        const rows = el.find('a')

        expect(rows).toHaveLength(3)
        expect(rows.eq(0).attr('href')).toEqual('/item/5')
        expect(rows.eq(0).text()).toEqual('Foo')
        expect(rows.eq(1).attr('href')).toEqual('/item/6')
        expect(rows.eq(1).text()).toEqual('Bar')
        expect(rows.eq(2).attr('href')).toEqual('/item/7')
        expect(rows.eq(2).text()).toEqual('Baz')
      })
    })

  })
})

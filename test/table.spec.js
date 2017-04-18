
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

    it('ignores non-column children', () => {
      const data = [{ a: 5, b: 5 }, { a: 3, b: 8 }, { a: 2, b: 8 }]

      const el = mount((
        <Table data={data}>
          <span>Hello world</span>
          <Column header="A" cellKey="a" />
          <Column header="B" cellKey="b" />
        </Table>
      ))

      expect(el.text()).not.toMatch(/hello world/i)
      expect(el.find('tr')).toHaveLength(4)
    })

    it('does not allow nested columns', () => {
      const data = [{ a: 5, b: 5 }, { a: 3, b: 8 }, { a: 2, b: 8 }]

      const el = mount((
        <Table data={data}>
          <span>
            <span>Foo Bar</span>
            <Column header="A" cellKey="a" />
            <Column header="B" cellKey="b" />
          </span>
        </Table>
      ))

      expect(el.text()).not.toMatch(/foo bar/i)
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
      const getRowProps = row => ({ className: 'f', onClick: row.fn })
      const data = [{ a: 5, fn: jest.fn() }, { a: 9, fn: jest.fn() }, { a: 6, fn: jest.fn() }]

      const el = mount((
        <Table data={data} getRowProps={getRowProps}>
          <Column header="A" cell={row => row.a} />
        </Table>
      ))

      const rows = el.find('tbody tr')

      expect(rows).toHaveLength(3)
      rows.forEach((row, index) => {
        expect(data[index].fn.mock.calls).toHaveLength(0)
        // TODO: don't fake it
        data[index].fn(data[index])
        expect(data[index].fn.mock.calls).toHaveLength(1)
        expect(data[index].fn.mock.calls[0]).toEqual([data[index]])
      })
    })

    describe('row', () => {
      it('provides the row\'s data as a prop', () => {
        const components = {
          table: 'div',
          header: 'div',
          headerRow: 'div',
          headerCell: 'div',
          body: 'div',
          row: 'a',
          cell: 'div',
        }

        const getters = {
          getBodyProps: () => ({ className: 'body' }),
          getRowProps: row => ({ href: `/item/${row.id}` }),
        }

        const data = [
          { id: 5, name: 'Foo' },
          { id: 6, name: 'Bar' },
          { id: 7, name: 'Baz' }
        ]

        const el = render((
          <Table components={components} data={data} {...getters}>
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

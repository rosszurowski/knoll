/* global React, ReactDOM */

const { Component } = React
const { default: Table, Column } = Knoll

const data = [
  { id: 1, name: 'Birch', kind: 'coniferous', image: 'http://www.punmiris.com/himg/o.21073.jpg' },
  { id: 2, name: 'Oak', kind: 'deciduous', image: 'http://www.encyclopediaofukraine.com/pic%5CO%5CA%5COak%20tree.jpg' },
  { id: 3, name: 'Maple', kind: 'deciduous', image: 'http://www.drodd.com/images15/maple10.jpg' },
  { id: 4, name: 'Fir', kind: 'coniferous', image: 'http://www.thegreatfraserfircompany.com/uploads/2/6/6/1/26615835/2111136_orig.jpg' }
]

class Example extends Component {
  render () {
    return (
      <Table data={data}>
        <Column header="Order" cell={row => row.id} />
        <Column header="Image" cell={row => <img src={row.image} alt={row.name} />} />
        <Column header="Name" cell={row => row.name} />
        <Column header="Kind" cell={row => row.kind} />
      </Table>
    )
  }
}

ReactDOM.render(<Example />, document.getElementById('root'))

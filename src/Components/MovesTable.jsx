import Table from 'react-bootstrap/Table';

function MovesTable() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Move Name</th>
          <th>Flavor Text</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default MovesTable;
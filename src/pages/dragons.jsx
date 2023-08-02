// src/pages/dragons.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Container, Button } from 'react-bootstrap';
import { fetchDragons, reserveDragon, cancelDragonReservation } from '../redux/dragons/dragonsSlice';

function Dragons() {
  const dispatch = useDispatch();
  const dragons = useSelector((state) => state.dragons.list);

  useEffect(() => {
    if (dragons.length === 0) {
      dispatch(fetchDragons());
    }
  }, [dispatch, dragons]);

  const handleAction = (id, reserved) => {
    if (reserved) {
      dispatch(cancelDragonReservation(id));
    } else {
      dispatch(reserveDragon(id));
    }
  };

  return (
    <Container>
      <h1>Dragons</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Dragons</th>
            <th style={{ width: '8%' }}>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dragons.map((dragon) => (
            <tr key={dragon.dragonId}>
              <td><img src={dragon.flickrImages[0]} alt={`Imagen de ${dragon.dragonName}`} width="250" /></td>
              <td>{dragon.dragonName}</td>
              <td>{dragon.description}</td>
              <td style={{ textAlign: 'center' }}>
                {dragon.reserved ? <p style={{ color: 'green' }}>Reserved</p> : null}
                <Button variant={dragon.reserved ? 'secondary' : 'primary'} onClick={() => handleAction(dragon.dragonId, dragon.reserved)} style={{ width: '120px', margin: '5px', marginTop: '175%' }}>
                  {dragon.reserved ? 'Cancel' : 'Reserve'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>

  );
}

export default Dragons;

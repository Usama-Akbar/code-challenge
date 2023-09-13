import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Sample = () => {
  const [cards, setCards] = useState([]);
  const [records, setRecords] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products/1')
      .then(res => res.json())
      .then(data => setRecords([data]))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    setCards(records.map(val => ({ id: val.id, title: val.title })));
  }, [records]);

  const handleDeleteCard = (cardId) => {
    setCardToDelete(cardId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // Perform the actual card deletion here
    setCards(prevCards => prevCards.filter(card => card.id !== cardToDelete));
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className='card-container'>
      {cards.length > 0 ? (
        cards.map(card => (
          <Col sm={4} key={card.id}>
            <Card style={{ width: '22rem' }}>
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                <Card.Text></Card.Text>
                <div className='btn-container'>
                  <Link className="edit-btn" to="/MyForm">Edit</Link>
                  <button className="edit-btn2" onClick={() => handleDeleteCard(card.id)}>Delete</button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <p>Loading...</p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this card?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sample;

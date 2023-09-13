import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Sample from "../Sample";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
// import Button from './Button'
export const Home = () => {
  const [cards, setCards] = useState([]);
  const [records, setRecords] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cardToDelete, setCardToDelete] = useState("");
  const confirmDelete = async (id) => {
    console.log("WORKING");
    const request = await fetch(
      `http://localhost:8080/sector/delete/${cardToDelete}`,
      {
        method: "Delete",
      }
    );
    const response = await request.json();
    console.log("response", response);
    GetSectors();
    // Perform the actual card deletion here
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  async function GetSectors() {
    const request = await fetch("http://localhost:8080/sector/list", {
      method: "GET",
    });
    const response = await request.json();
    setCards(response.list);
  }

  useEffect(() => {
    GetSectors();
  }, [null]);
  return (
    <>
      <div className="head">
        <span>
          <h2>Sector App</h2>
        </span>
        <Link className="title-site" to="/MyForm">
          Add Record
        </Link>
      </div>
      <Row className="card-body-container">
        <div className="card-container">
          {cards?.length > 0 ? (
            cards.map((d, i) => (
              <Col sm={4}>
                <Card style={{ width: "22rem" }}>
                  <Card.Body>
                    <Card.Title>Name : {d.name}</Card.Title>
                    <Card.Title className="mt-2 mb-3">
                      Sector : {d.sector}
                    </Card.Title>
                    <div className="btn-container">
                      <Link className="edit-btn" to={`/MyForm/${d._id}`}>
                        Edit
                      </Link>
                      <button
                        className="edit-btn2"
                        onClick={() => {
                          setCardToDelete(d._id);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h3>No Sectors Available</h3>
          )}

          {/* Delete Confirmation Modal */}
        </div>
        <Modal show={showDeleteModal} onHide={cancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this card?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => confirmDelete()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  );
};

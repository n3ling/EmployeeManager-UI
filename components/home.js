import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function Hello() {
  const [post, setPost] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(`/employees`)
      .then(res => res.json())
      .then(data => {
        setPost(data[0]);
      });
  }, []);

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  
  
  return (
      <>
      <Container>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
              <h1>Welcome!</h1>
          </div>
          <Button variant="primary" onClick={handleShow}>View</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>ID: {post?.employeeID}</p>
        <p>First Name: {post?.givenName}</p>
        <p>Email: {post?.email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
      </>
    );
}
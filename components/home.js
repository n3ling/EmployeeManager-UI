import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Hello() {
  const [empData, setEmptData] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(`https://employeemanager-y5z4.onrender.com/employees`)
      .then(res => res.json())
      .then(data => {
        setEmptData(data[0]);
      });
  }, []);

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  
  
  return (
      <>
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
              <Container>
          <Navbar.Brand href="#home">Employees</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Help" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          </Container>
      </Navbar>
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
        <p>ID: {empData?.employeeID}</p>
        <p>First Name: {empData?.givenName}</p>
        <p>Email: {empData?.email}</p>
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

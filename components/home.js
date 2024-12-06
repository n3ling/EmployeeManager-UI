import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Hello() {
  return (
      <>
      <Container>
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
              <h1>Welcome!</h1>
          </div>
      </Container>
      </>
    );
}

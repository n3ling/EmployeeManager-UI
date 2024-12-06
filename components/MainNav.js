import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';

export default function Hello() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleAuth = () => {
    if (isLoggedIn) {
      // Perform logout actions here (e.g., clearing cookies, tokens, etc.)
      console.log('Logging out...');
      setIsLoggedIn(false);
    } else {
      // Navigate to the login page
      router.push('/login');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://employeemanager-y5z4.onrender.com/logout', {
        method: 'GET',
        credentials: 'include', // Include credentials for session management
      });

      if (response.ok) {
        router.push('/'); // Redirect to the homepage
      } else {
        console.error('Logout failed', response.statusText);
        // Optionally handle errors, e.g., show a message to the user
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">EmpManager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavigation('/employee/list')}>Employee List</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/shift/schedule')}>Shift Schedule</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/payment')}>Payment</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Button variant="outline-light" onClick={handleAuth}>
                {isLoggedIn ? 'Logout' : 'Login'}
              </Button>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

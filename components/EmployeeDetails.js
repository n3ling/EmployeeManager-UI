import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function EmployeeDetails() {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formEmployeeID">
        <Form.Label>Employee ID</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter employee ID"
          name="employeeID"
          value={employee.employeeID}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formGivenName">
        <Form.Label>Given Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter given name"
          name="givenName"
          value={employee.givenName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formSurname">
        <Form.Label>Surname</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter surname"
          name="surname"
          value={employee.surname}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          value={employee.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formSIN">
        <Form.Label>SIN</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter SIN"
          name="SIN"
          value={employee.SIN}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAddrStreet">
        <Form.Label>Address Street</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address street"
          name="addrStreet"
          value={employee.addrStreet}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAddrCity">
        <Form.Label>Address City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address city"
          name="addrCity"
          value={employee.addrCity}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAddrProv">
        <Form.Label>Address Province</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address province"
          name="addrProv"
          value={employee.addrProv}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAddrPostal">
        <Form.Label>Address Postal</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address postal"
          name="addrPostal"
          value={employee.addrPostal}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formIsManager">
        <Form.Label>Is Manager</Form.Label>
        <Form.Control
          as="select"
          name="isManager"
          value={employee.isManager}
          onChange={handleChange}
          required
        >
          <option value={0}>No</option>
          <option value={1}>Yes</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="status"
          value={employee.status}
          onChange={handleChange}
          required
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formDepartment">
        <Form.Label>Department</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter department"
          name="department"
          value={employee.department}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formHireDate">
        <Form.Label>Hire Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter hire date"
          name="hireDate"
          value={employee.hireDate}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
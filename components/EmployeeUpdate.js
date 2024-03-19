import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

export default function EmployeeUpdate(){
    
    const [employee, setEmployee] = useState({
        employeeID: '',
        givenName: '',
        surname: '',
        email: '',
        password: '',
        SIN: '',
        addrStreet: '',
        addrCity: '',
        addrProv: '',
        addrPostal: '',
        isManager: 0,
        empManagerID: null,
        status: 'Active',
        department: '',
        hireDate: '',
      });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(employee);
        onHide(); // Close the modal after submission
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
      };
    
    return(
        <>
         <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-6">
                  <Form.Group controlId="formGivenName" style={{ marginBottom: '15px' }}>
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
                </div>
                <div className="col-sm-6">
                  <Form.Group controlId="formSurname" style={{ marginBottom: '15px' }}>
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
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <Form.Group controlId="formEmail" style={{ marginBottom: '15px' }}>
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
                </div>
                <div className="col-sm-6">
                  <Form.Group controlId="formPassword" style={{ marginBottom: '15px' }}>
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
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <Form.Group controlId="formSIN" style={{ marginBottom: '15px' }}>
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
                </div>
              </div>

              <div className="row">
              <div className="col-sm-12">
                  <Form.Group controlId="formAddrStreet" style={{ marginBottom: '15px' }}>
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
                </div>
                <div className="col-sm-6">
                  <Form.Group controlId="formAddrCity" style={{ marginBottom: '15px' }}>
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
                </div>
                <div className="col-sm-6">
                  <Form.Group controlId="formAddrProv" style={{ marginBottom: '15px' }}>
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
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <Form.Group controlId="formAddrPostal" style={{ marginBottom: '15px' }}>
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
                </div>
              </div>

              <div className="row">
              <div className="col-sm-6">
                  <Form.Group controlId="formIsManager" style={{ marginBottom: '15px' }}>
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
                </div>
                <div className="col-sm-6">
                  <Form.Group controlId="formStatus" style={{ marginBottom: '15px' }}>
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
                </div>
                <div className="col-sm-6">
                  <Form.Group controlId="formDepartment" style={{ marginBottom: '15px' }}>
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
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <Form.Group controlId="formHireDate" style={{ marginBottom: '15px' }}>
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
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12">
                  <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
        </>
    )
}
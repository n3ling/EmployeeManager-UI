import React, { useState, useEffect } from 'react';
import { Accordion, Button, Form, Modal } from 'react-bootstrap';
import { deleteEmployee, addEmployee, updateEmployee } from '@/lib/employeeData';
import { useRouter } from 'next/router';

export default function EmployeeList(){
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [employees, setEmployees] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
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

    const [selectedEmployee, setSelectedEmployee] = useState({
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

    useEffect(() => {
      fetch('https://employeemanager-y5z4.onrender.com/employees')
        .then(res => res.json())
        .then(data => setEmployees(data))
        .catch(err => console.error('Error fetching data:', err));
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployee({ ...employee, [name]: value });
    };

    const handleChangeUpdate = (e) => {
      const { name, value } = e.target;
      setSelectedEmployee({ ...selectedEmployee, [name]: value });
    };

    async function handleSubmit(e){
      e.preventDefault();
      addEmployee(employee);
      setShowUpdate(false);
      router.push('/employee/list')
    };

    const handleDelete = (id) => {
      deleteEmployee(id);
      router.push('/employee/list')
    };

    async function handleUpdate(e){
      e.preventDefault();
      updateEmployee(selectedEmployee);
      console.log(selectedEmployee);
      //router.push('/employee/list');
    };

    const handleSelectEmployeeForUpdate = (employee) => {
      setSelectedEmployee(employee);
    };
  
    return (
      <>
      <div className="d-flex justify-content-between mb-3">
        <h2>Employee List</h2>
        <Button variant="primary" onClick={handleShow}>Add New Employee</Button>
        
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add New Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-sm-6">
                <Form.Group controlId="formID" style={{ marginBottom: '15px' }}>
                    <Form.Label>ID</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter ID"
                      name="employeeID"
                      value={employee.employeeID}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </div>
              </div>

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
          </Modal.Body>
        </Modal>

      </div>
          <Accordion defaultActiveKey="0">
            {employees.map(employee => (
              <Accordion.Item eventKey={employee.employeeID} key={employee.employeeID}>
              <Accordion.Header>
                <div className="row">
                  <div className="col-md-auto">
                    <strong>Employee ID:</strong> {employee.employeeID}
                  </div>
                  <div className="col-md-auto">
                    <strong>Name:</strong> {employee.givenName} {employee.surname}
                  </div>
                  <div className="col-md-auto">
                    <strong>Email:</strong> {employee.email}
                  </div>
                  <div className="col-md-auto">
                    <Button variant="danger" onClick={() => handleDelete(employee.employeeID)}>Delete</Button>
                    <Button variant="success" onClick={() => handleSelectEmployeeForUpdate(employee)}>Select</Button>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Form onSubmit={handleUpdate}>
                <div className="row">
                  <div className="col-sm-6">
                  <Form.Group controlId="formID" style={{ marginBottom: '15px' }}>
                      <Form.Label>ID</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter ID"
                        name="employeeID"
                        defaultValue={employee.employeeID}
                        onChange={handleChangeUpdate}
                        required
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <Form.Group controlId="formGivenName" style={{ marginBottom: '15px' }}>
                      <Form.Label>Given Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter given name"
                        name="givenName"
                        defaultValue={employee.givenName}
                        onChange={handleChangeUpdate}
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
                        defaultValue={employee.surname}
                        onChange={handleChangeUpdate}
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
                        defaultValue={employee.email}
                        onChange={handleChangeUpdate}
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
                        defaultValue={employee.password}
                        onChange={handleChangeUpdate}
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
                        defaultValue={employee.SIN}
                        onChange={handleChangeUpdate}
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
                        defaultValue={employee.addrStreet}
                        onChange={handleChangeUpdate}
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
                        defaultValue={employee.addrCity}
                        onChange={handleChangeUpdate}
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
                        defaultValue={employee.addrProv}
                        onChange={handleChangeUpdate}
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
                        defaultValue={employee.addrPostal}
                        onChange={handleChangeUpdate}
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
                        defaultValue={employee.isManager}
                        onChange={handleChangeUpdate}
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
                        defaultValue={employee.status}
                        onChange={handleChangeUpdate}
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
                        defaultValue={employee.department}
                        onChange={handleChangeUpdate}
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
                        defaultValue={employee.hireDate}
                        onChange={handleChangeUpdate}
                        required
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12">
                    <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                      Update
                    </Button>
                  </div>
                </div>
              </Form>
              </Accordion.Body>
            </Accordion.Item>
            ))}
          </Accordion>
      </>
    );
  };
  
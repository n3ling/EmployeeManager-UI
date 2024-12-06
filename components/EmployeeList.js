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
    const [validatedSubmit, setValidatedSubmit] = useState(false);
    const [validatedUpdate, setValidatedUpdate] = useState(false);
    const [emailError, setEmailError] = useState("Enter a valid email");
    const [emailUpdateError, setEmailUpdateError] = useState("Enter a valid email");
    const [duplicateEmail, setDuplicateEmail] = useState(false)
    const [duplicateUpdateEmail, setUpdateDuplicateEmail] = useState(false)

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
      payRate: 0.0
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
      payRate: 0.0
    });
    const [selectedEmployeeCopy, setSelectedEmployeeCopy] = useState({
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
      payRate: 0.0
    });

    function checkDuplicateEmails(email){
      for (const emp of employees) {
        if (emp.email === email) {
          setEmailError("That email is already is use.")
          return true; 
        } 
      }
      setDuplicateEmail(false)
      return false; 
    };

    useEffect(() => {
      const fetchEmployees = async () => {
        try {
          // Access cookie explicitly if needed
          const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1]; // Retrieve the token value from the cookie
          
          const response = await fetch('https://employeemanager-y5z4.onrender.com/employees', {
            method: "GET",
            credentials: "include", // Ensure cookies are included with the request
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in Authorization header if necessary
            },
          });
    
          if (!response.ok) {
            if (response.status === 401) {
              router.push('/unauthorized'); // Redirect if unauthorized
              return; // Stop further execution
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          setEmployees(data); // Update employees state
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchEmployees();
    }, [router]);
  

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployee({ ...employee, [name]: value });

      if (name === 'email') {
        const isDuplicate = checkDuplicateEmails(value);
        setDuplicateEmail(isDuplicate);
        if (isDuplicate) {
          setEmailError('That email is already in use.');
        } else {
          setEmailError('');
        }
      }
    };

    const handleChangeUpdate = (e) => {
      const { name, value } = e.target;
      setSelectedEmployee(prevState => ({
        ...prevState,
        [name]: value
      }))
    
      if (name === 'email') {
        const isDuplicate = checkDuplicateEmails(value);
        if (isDuplicate && value !== selectedEmployeeCopy.email) {
          setUpdateDuplicateEmail(isDuplicate);
          setEmailUpdateError('That email is already in use.');
        } else {
          setEmailUpdateError('');
        }
      }
    };

    async function handleSubmit(e){
      e.preventDefault();
      if (duplicateEmail) {
        setValidatedSubmit(false);
        return;
      }
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      else{
        e.preventDefault();
        try{
          await addEmployee(employee);
          window.location.reload(false);
        } catch(err){
          console.error('Error adding employee:', err);
        }
      }
      setValidatedSubmit(true);
    };

    async function handleDelete(e, id){
      e.stopPropagation();
      try{
        await deleteEmployee(id);
        window.location.reload(false);
      } catch(err){
        console.error('Error deleting employee:', err);
      }
    };

    async function handleUpdate(e){
      e.preventDefault();
      if (duplicateUpdateEmail) {
        setValidatedUpdate(false);
        return;
      }
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      else{
        e.preventDefault();
        try{
          await updateEmployee(selectedEmployee);
          window.location.reload(false);
        } catch(err){
          console.error('Error updating employee:', er);
        }
      }
      setValidatedUpdate(true);
    };

    const handleSelectEmployeeForUpdate = (employee) => {
      setSelectedEmployee(employee);
      setSelectedEmployeeCopy(employee);
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
              <Form noValidate validated={validatedSubmit} onSubmit={handleSubmit}>
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
                      <Form.Control.Feedback type="invalid">Enter employee name.</Form.Control.Feedback>
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
                      <Form.Control.Feedback type="invalid">Enter employee surname.</Form.Control.Feedback>
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
                        isInvalid={duplicateEmail}
                        onChange={handleChange}
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        required
                      />
                        <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">Enter a password.</Form.Control.Feedback>
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
                      <Form.Control.Feedback type="invalid">Enter the SIN number (Numbers only).</Form.Control.Feedback>
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
                      <Form.Control.Feedback type="invalid">Enter the full address.</Form.Control.Feedback>
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
                        pattern= "[a-zA-Z]+"
                        required
                      />
                        <Form.Control.Feedback type="invalid">Enter the city.</Form.Control.Feedback>
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
                        pattern='^(AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT|Alberta|British Columbia|Manitoba|New Brunswick|Newfoundland and Labrador|Nova Scotia|Northwest Territories|Nunavut|Ontario|Prince Edward Island|Quebec|Saskatchewan|Yukon)$'
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">Enter a valid Canadian province (QC or Quebec).</Form.Control.Feedback>
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
                        pattern="[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d"
                        required
                      />
                      <Form.Control.Feedback type="invalid">Enter a valid Canadian postal code (A1B 2C3).</Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">Choose department #.</Form.Control.Feedback>
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
                    <Form.Group controlId="formPayRate" style={{ marginBottom: '15px' }}>
                      <Form.Label>Wage</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter wage"
                        name="payRate"
                        min="0"
                        step="0.01"
                        value={employee.payRate}
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
            <Accordion.Header onClick={() => handleSelectEmployeeForUpdate(employee)}>
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
                  <Button variant="danger" onClick={(e) => handleDelete(e, employee.employeeID)}>Delete</Button>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <Form noValidate validated={validatedUpdate} onSubmit={handleUpdate}>
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
                    <Form.Control.Feedback type="invalid">Enter employee name.</Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">Enter employee surname.</Form.Control.Feedback>
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
                      isInvalid={duplicateEmail}
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      required
                    />
                    <Form.Control.Feedback type="invalid">{emailUpdateError}</Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">Enter a password.</Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">Enter the SIN number (Numbers only).</Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">Enter the full address.</Form.Control.Feedback>
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
                      pattern= "[a-zA-Z]+"
                      required
                    />
                    <Form.Control.Feedback type="invalid">Enter the city.</Form.Control.Feedback>
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
                      pattern='^(AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT|Alberta|British Columbia|Manitoba|New Brunswick|Newfoundland and Labrador|Nova Scotia|Northwest Territories|Nunavut|Ontario|Prince Edward Island|Quebec|Saskatchewan|Yukon)$'
                      required
                    />
                    <Form.Control.Feedback type="invalid">Enter a valid Canadian province (QC or Quebec).</Form.Control.Feedback>
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
                      pattern="[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d"
                      required
                    />
                    <Form.Control.Feedback type="invalid">Enter a valid Canadian postal code (A1B 2C3).</Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">Choose department #.</Form.Control.Feedback>
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
                <Form.Group controlId="formPayRate" style={{ marginBottom: '15px' }}>
                  <Form.Label>Wage</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter wage"
                    name="payRate"
                    min="0"
                    step="0.01"
                    value={employee.payRate}
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
  
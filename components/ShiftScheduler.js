import {addShift, deleteShift, updateShift} from '@/lib/shiftData'
import Table from 'react-bootstrap/Table';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';




export default function ShiftScheduler(){
    const router = useRouter();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch('https://employeemanager-y5z4.onrender.com/employees')
          .then(res => res.json())
          .then(data => setEmployees(data))
          .catch(err => console.error('Error fetching data:', err));
      }, []);

    return (
        <>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>Name</th>
            <th>Day 1</th>
            <th>Day 2</th>
            <th>Day 3</th>
            </tr>
        </thead>
        <tbody>
        {employees.map((employee) => (
            <tr key={employee.id}> {/* Ensure each row has a unique key */}
              <td>{employee.givenName}</td>
              <td>No Shift</td>
              <td>No Shift</td>
              <td>No Shift</td>
            </tr>
          ))}
        </tbody>
        </Table>
        </>
      )
}
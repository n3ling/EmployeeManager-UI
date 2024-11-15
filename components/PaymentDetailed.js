import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function PaymentDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Set default dates
  const defaultStartDate = '2024-01-01';
  const defaultEndDate = new Date().toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const [employeeData, setEmployeeData] = useState(null);
  const [loadingEmployee, setLoadingEmployee] = useState(true);
  const [employeeError, setEmployeeError] = useState(null);

  const [earningsData, setEarningsData] = useState(null);
  const [loadingEarnings, setLoadingEarnings] = useState(true);
  const [earningsError, setEarningsError] = useState(null);

  // Fetch detailed employee data
  useEffect(() => {
    if (id) {
      const fetchEmployeeData = async () => {
        try {
          const response = await fetch('https://employeemanager-y5z4.onrender.com/employees');
          if (!response.ok) {
            throw new Error('Failed to fetch employees.');
          }
          const data = await response.json();
          const matchedEmployee = data.find((employee) => employee.employeeID === parseInt(id));
          if (!matchedEmployee) {
            throw new Error('Employee not found.');
          }
          setEmployeeData(matchedEmployee);
        } catch (err) {
          setEmployeeError(err.message);
        } finally {
          setLoadingEmployee(false);
        }
      };

      fetchEmployeeData();
    }
  }, [id]);

  // Fetch earnings summary for the employee
  useEffect(() => {
    if (id && startDate && endDate) {
      const fetchEarningsData = async () => {
        try {
          const searchFilter = {
            empID: id,
            startDate,
            endDate
          };

          const response = await fetch('https://employeemanager-y5z4.onrender.com/earnings/single', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchFilter)
          });

          if (!response.ok) {
            throw new Error('Failed to fetch earnings data.');
          }

          const data = await response.json();
          setEarningsData(data);
        } catch (err) {
          setEarningsError(err.message);
        } finally {
          setLoadingEarnings(false);
        }
      };

      fetchEarningsData();
    }
  }, [id, startDate, endDate]);

    // Handle date changes
    const handleDateChange = (e) => {
      const { name, value } = e.target;
      if (name === 'startDate') {
        setStartDate(value);
      } else if (name === 'endDate') {
        setEndDate(value);
      }
    };

  return (
    <div>
      {/* Employee Data Section */}
      <section>
        <h2>Personal Information</h2>
        {loadingEmployee ? (
          <p>Loading employee data...</p>
        ) : employeeError ? (
          <p>Error: {employeeError}</p>
        ) : employeeData ? (
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">{employeeData.givenName} {employeeData.surname}</h3>
              <p><strong>ID:</strong> {employeeData.employeeID}</p>
              <p><strong>Email:</strong> {employeeData.email}</p>
              {/* Add other relevant fields from employeeData as needed */}
            </div>
          </div>
        ) : (
          <p>No employee data available.</p>
        )}
      </section>

      {/* Date range input */}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', marginTop: '1rem' }}>
        <h2>Select Date Range</h2>
        <label style={{ display: 'inline-block', marginBottom: '0.25rem' }}>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        <label style={{ display: 'inline-block', marginTop: '0.5rem' }}>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
      </div>

      {/* Earnings Data Section */}
      <section>
        <h2>Earnings Summary (From {startDate} to {endDate})</h2>
        {loadingEarnings ? (
          <p>Loading earnings data...</p>
        ) : earningsError ? (
          <p>Error: {earningsError}</p>
        ) : earningsData ? (
          <div className="card">
            <div className="card-body">
              <p>Regular Hours Outstanding: {earningsData.regularHoursOutstanding}</p>
              <p>Holiday Hours Outstanding: {earningsData.holidayHoursOutstanding}</p>
              <p>Regular Hours Paid: {earningsData.regularHoursPaid}</p>
              <p>Holiday Hours Paid: {earningsData.holidayHoursPaid}</p>
              <p>Total Hours Outstanding: {earningsData.totalHoursOutstanding}</p>
              <p>Total Hours Paid: {earningsData.totalHoursPaid}</p>
              <p>Regular Wages Owing: {earningsData.regularWagesOwing}</p>
              <p>Holiday Wages Owing: {earningsData.holidayWagesOwing}</p>
              <p>Regular Wages Paid: {earningsData.regularWagesPaid}</p>
              <p>Holiday Wages Paid: {earningsData.holidayWagesPaid}</p>
            </div>
          </div>
        ) : (
          <p>No earnings data available.</p>
        )}
      </section>
    </div>
  );
}
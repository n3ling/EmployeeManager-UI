import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PaymentOverview() {
  // Setting default dates
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  });

  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [employeeError, setEmployeeError] = useState(null);
  
  const [earningsData, setEarningsData] = useState(null);
  const [loadingEarnings, setLoadingEarnings] = useState(true);
  const [earningsError, setEarningsError] = useState(null);

  const router = useRouter();

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('https://employeemanager-y5z4.onrender.com/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch employees.');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setEmployeeError(err.message);
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchEmployees();
  }, []);

  // Fetch earnings summary
  useEffect(() => {
    const fetchEarningsSummary = async () => {
      try {
        const response = await fetch('https://employeemanager-y5z4.onrender.com/earnings/all', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ startDate, endDate })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch earnings summary.');
        }
        const data = await response.json();
        setEarningsData(data);
      } catch (err) {
        setEarningsError(err.message);
      } finally {
        setLoadingEarnings(false);
      }
    };

    fetchEarningsSummary();
  }, [startDate, endDate]);

  return (
    <div>
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

      <h1>Payment Overview</h1>
      {/* Earnings Overview Section */}
      <section>
        <h2>Earnings Overview</h2>
        {loadingEarnings ? (
          <p>Loading earnings...</p>
        ) : earningsError ? (
          <p>Error: {earningsError}</p>
        ) : earningsData ? (
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Earnings Summary</h3>
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

      {/* Employee List Section */}
      <section>
        <h2>Employee List</h2>
        {loadingEmployees ? (
          <p>Loading employees...</p>
        ) : employeeError ? (
          <p>Error: {employeeError}</p>
        ) : employees && employees.length > 0 ? (
          <div className="list-group">
            {employees.map((employee) => (
              <div className="card list-group-item mb-3" key={employee.id}>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link
                      href={{
                        pathname: `/payment/${employee.employeeID}`,
                        query: { startDate, endDate }
                      }}
                    >
                      {employee.givenName} {employee.surname}
                    </Link>
                  </h5>
                  <p className="card-text">ID: {employee.employeeID}</p>
                  {/* Add more details if needed */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No employees to display.</p>
        )}
      </section>
    </div>
  );
}
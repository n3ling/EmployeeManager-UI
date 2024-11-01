import { useState, useEffect } from 'react';
import { ScheduleEventType, WeeklySchedule } from 'react-beautiful-schedule';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { addShift, updateShift, deleteShift } from '@/lib/shiftData';
import { addAttendance, updateAttendance, deleteAttendance, updateCheckIn } from '@/lib/attendanceData';
import React from 'react';

function ShiftScheduler() {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [attendanceID, setAttendanceID] = useState(0);
  const [events, setEvents] = useState<ScheduleEventType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalAttendVisible, setIsModalAttendVisible] = useState(false)
  const [key, setKey] = useState(0)
  const [keyAttend, setKeyAttend] = useState(0)
  const [errors, setErrors] = useState({ startTime: '', endTime: '' });
  const [isFormValid, setIsFormValid] = useState(true);
  const [shift, setShift] = useState({
    shiftID: 0, 
    shiftDate: '',
    startTime: '',
    endTime: '',
    isHoliday: false
  });
  const [attend, setAttend] = useState({
    attendanceID: 0, 
    shiftID: 0,
    empID: 0,
    checkedIn: false
  });
  const [selectedEmployee, setSelectedEmployee] = useState(attendance.empID || "");
  const [isOverlap, setIsOverlap] = useState(false);
  const [overlapMessage, setOverlapMessage] = useState('');
  const [overlapEditShiftMessage, setOverlapEditShiftMessage] = useState('');
  const [isOverlapShift, setIsOverlapShift] = useState(false);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2); // Add leading 0 for single digits
    const day = (`0${d.getDate()}`).slice(-2); // Add leading 0 for single digits
    return `${year}-${month}-${day}`;
  };

  // Check if time is valid (in 15-minute intervals)
  const isTimeValid = (time) => {
    const minutes = new Date(`1970-01-01T${time}:00`).getMinutes();
    return [0, 15, 30, 45].includes(minutes);
  };

  // Check if the end time is after the start time
  const isEndTimeValid = (startTime, endTime) => {
    return new Date(`1970-01-01T${endTime}:00`) > new Date(`1970-01-01T${startTime}:00`);
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    const newShift = {
      ...shift,
      [id]: type === 'checkbox' ? checked : value,
    };

    setShift(newShift);
    validateShiftTimes(newShift);

        // Validate overlap
    const { shiftDate, startTime, endTime } = newShift;

    if (shiftDate && startTime && endTime) {
      const shiftStart = new Date(`${shiftDate}T${startTime}`);
      const shiftEnd = new Date(`${shiftDate}T${endTime}`);

      const hasOverlap = attendance.some(att => {
        const otherShift = data.find(s => s.shiftID === att.shiftID);

        // Check if the employee has another shift on the same date that isn't the current shift
        if (att.empID === selectedEmployee && otherShift && otherShift.shiftID !== shift.shiftID && otherShift.shiftDate === shiftDate) {
          const otherShiftStart = new Date(`${otherShift.shiftDate}T${otherShift.startTime}`);
          const otherShiftEnd = new Date(`${otherShift.shiftDate}T${otherShift.endTime}`);

          // Return true if times overlap
          return (shiftStart < otherShiftEnd && shiftEnd > otherShiftStart);
        }
        return false;
      });
      console.log(hasOverlap)
      if (hasOverlap) {
        setIsOverlapShift(true);
        setOverlapEditShiftMessage("This edit will cause a conflict with another shift.");
      } else {
        setIsOverlapShift(false);
        setOverlapEditShiftMessage('');
      }
    }
  };

  // Validate shift times
  const validateShiftTimes = (newShift) => {
    let startTimeError = '';
    let endTimeError = '';
    let isValid = true;

    // Validate start time
    if (!isTimeValid(newShift.startTime)) {
      startTimeError = 'Start time must be at a 15-minute interval (:00, :15, :30, :45).';
      isValid = false;
    }

    // Validate end time
    if (!isTimeValid(newShift.endTime)) {
      endTimeError = 'End time must be at a 15-minute interval (:00, :15, :30, :45).';
      isValid = false;
    } else if (!isEndTimeValid(newShift.startTime, newShift.endTime)) {
      endTimeError = 'End time must be after start time.';
      isValid = false;
    }

    // Update error state and form validity
    setErrors({ startTime: startTimeError, endTime: endTimeError });
    setIsFormValid(isValid);
  };

  const transformDataToEvents = (data, attendance, employees) => {  
    const findAttendance = attendance.find(att => att.shiftID === data.shiftID);
    let description = "Unassigned";
    if (findAttendance){
      const employee = employees.find(emp => emp.employeeID === findAttendance.empID);
      if(employee){
        const checkInStatus = findAttendance.checkedIn ? '✓' : '✗';
        description = `${employee.employeeID}. ${employee.givenName} ${employee.surname} (${checkInStatus})`;
      }
    }
    
    return {
      id: data.shiftID.toString(),
      title: `Shift ${data.shiftID}`,
      start: `${data.shiftDate}T${data.startTime}`,
      end: `${data.shiftDate}T${data.endTime}`,
      defaultTheme: data.isHoliday > 0 ? 'yellow' : 'blue',
      description: description
    }
  }

  const transformAllData = (data) => {
    return data.map(shift => transformDataToEvents(shift, attendance, employees));
  }

  const findHighestID = (data) => {
    if (data.length === 0) return 0; // Handle empty data

    return data.reduce((maxID, shift) => {
      return shift.shiftID > maxID ? shift.shiftID : maxID;
    }, 0);
  }

  const fetchData = (url, setState) => {
    fetch(url)
      .then(res => res.json())
      .then(data => setState(data))
      .catch(err => console.error(`Error fetching data from ${url}:`, err));
  };
  
  useEffect(() => {
    fetchData('https://employeemanager-y5z4.onrender.com/shift', setData);
  }, []);
  
  useEffect(() => {
    fetchData('https://employeemanager-y5z4.onrender.com/employees', setEmployees);
  }, []);
  
  useEffect(() => {
    fetchData('https://employeemanager-y5z4.onrender.com/attendance', setAttendance);
  }, []);
  
  useEffect(() => {
    if (data.length > 0) {
      const temp = transformAllData(data);
      setEvents(temp);
    }
  }, [data]); 

  function showModal() {
    setIsModalVisible(true)
  }

  function hideModal() {
    setIsModalVisible(false)
  }

  function showModalAttend() {
    setIsModalAttendVisible(true)
  }

  function hideModalAttend() {
    setIsModalAttendVisible(false)
  }

  function handleAddEvent(date: Date) {
    setKey(null)
    setShift({
      shiftDate: formatDate(date),
      startTime: '',
      endTime: '',
      isHoliday: false
    })
    showModal()
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;
    try {
        let success;

        if (key) { 
            success = await updateShift(shift);
            if (success) {
                console.log("Shift updated successfully");
            } else {
                console.error("Failed to update shift");
            }
        } else {
            success = await addShift(shift); 
            if (success) {
                console.log("Shift added successfully");
            } else {
                console.error("Failed to add shift");
            }
        }

        if (success) {
            window.location.reload(); 
        }

    } catch (error) {
        console.error("An error occurred while processing the shift:", error);
    }
  }

  function findAttendanceIDByShiftID(attendanceList, targetShiftID) {
    const attendanceRecord = attendanceList.find(att => att.shiftID === parseInt(targetShiftID));
  
    return attendanceRecord ? attendanceRecord.attendanceID : null;
  }

  function handleClickEvent(day: Date, dayISO: string | null, event: ScheduleEventProps) {
    setKey(event.id);

    // Get the attendance ID based on the shift ID
    let attendID = findAttendanceIDByShiftID(attendance, event.id); // Use event.id instead of key
    let attendanceData = null;
    if (attendID) {
      attendanceData = attendance.find(att => att.attendanceID === attendID);
  }

    // Update shift and attendance state using attendID directly
    setShift({
        shiftID: event.id,
        shiftDate: formatDate(day),
        startTime: event.start.split('T')[1],
        endTime: event.end.split('T')[1],
        isHoliday: event.defaultTheme === "blue" ? false : true
    });

    setAttend(prevAttend => ({
        ...prevAttend,
        attendanceID: attendID, // Use attendID directly
        empID: (attendanceData && attendanceData.empID) || 0,
        shiftID: event.id,
        checkedIn: (attendanceData && attendanceData.checkedIn) || false
    }));
    console.log( attendanceData)
    setKeyAttend(attendID)
    showModalAttend();
  }

  async function handleDelete(e, id){
    e.stopPropagation();
    try{
      await deleteShift(id);
      window.location.reload();
    } catch(err){
      console.error('Error deleting employee:', err);
    }
  };

  async function handleAttendSubmit(e) {
    e.preventDefault();
    console.log(keyAttend);
    console.log(attend);

    try {
        let success;

        // Assuming `getExistingAttendance()` is a function that fetches the existing attendance object by keyAttend
        const existingAttend = attend

        // Compare the `attend` object with the `existingAttend` object, except for `checkedIn`
        const isSameExceptCheckedIn = Object.keys(attend).every(key => {
            if (key === 'checkedIn') {
                return true; // Skip `checkedIn`
            }
            return attend[key] === existingAttend[key];
        });

        if (isSameExceptCheckedIn) {
            // If only `checkedIn` is different, call updateCheckedIn
            success = await updateCheckIn(attend); // Pass relevant data
            if (success) {
                console.log("CheckedIn status updated successfully");
            } else {
                console.error("Failed to update CheckedIn status");
            }
        } else {
            // Proceed with regular attendance update or add logic
            if (keyAttend) { 
                success = await updateAttendance(attend);
                if (success) {
                    console.log("Attendance updated successfully");
                } else {
                    console.error("Failed to update attendance");
                }
            } else {
                success = await addAttendance(attend); 
                if (success) {
                    console.log("Attendance added successfully");
                } else {
                    console.error("Failed to add attendance");
                }
            }
        }

        if (success) {
            window.location.reload(); 
        }

    } catch (error) {
        console.error("An error occurred while processing the attendance:", error);
    }
}

  async function handleRemoveAttend(e){
    console.log(typeof(key))
    console.log(attendance)

    if (!key || attendance.length === 0) {
      console.error('Shift ID or attendance data not available');
      return;
    }

    const matchingAttendance = attendance.find(att => att.shiftID == key);
    if (!matchingAttendance) {
      console.error('No matching attendance found');
      return;
    }

    const attendanceID = matchingAttendance.attendanceID;
    console.log(attendanceID)

    e.stopPropagation();
    try{
      await deleteAttendance(attendanceID);
      window.location.reload();
    } catch(err){
      console.error('Error deleting attendance:', err);
    }
  }

  const handleEmployeeSelectChange = (e) => {
    const selectedEmpID = Number(e.target.value);
    setSelectedEmployee(e.target.value);
    setAttend(prevAttend => ({
        ...prevAttend,
        empID: selectedEmpID
    }));

    if (shift) {
      const { shiftDate, startTime, endTime, shiftID } = shift; // Get the current shiftID
  
      // Convert times to Date objects for easy comparison
      const shiftStart = new Date(`${shiftDate}T${startTime}`);
      const shiftEnd = new Date(`${shiftDate}T${endTime}`);
  
      // Check if the selected employee is already assigned to the current shift
      const isCurrentlyAssigned = attendance.some(att => Number(att.empID) === Number(selectedEmpID) && Number(att.shiftID === Number(shiftID)));
      console.log("Assigned: " + isCurrentlyAssigned )
      // If the employee is currently assigned to this shift, don't check for overlap
      if (isCurrentlyAssigned) {
          setIsOverlap(false);
          setOverlapMessage(''); // Clear the message if they are already assigned
      } else {
          // Check for overlap, excluding the current shift
          const hasOverlap = attendance.some(att => {
              if (att.empID === selectedEmpID) {
                  const otherShift = data.find(s => s.shiftID === att.shiftID);
  
                  // Only check other shifts that are not the current shift
                  if (otherShift && otherShift.shiftID !== shiftID && otherShift.shiftDate === shiftDate) {
                      const otherShiftStart = new Date(`${otherShift.shiftDate}T${otherShift.startTime}`);
                      const otherShiftEnd = new Date(`${otherShift.shiftDate}T${otherShift.endTime}`);
  
                      // Check if the time intervals overlap, including edge cases for equal times
                      const overlapCheck = (shiftStart < otherShiftEnd && shiftEnd > otherShiftStart);
                      console.log(`Checking overlap with ${otherShift.shiftID}:`, overlapCheck); // Log the overlap check
                      return overlapCheck;
                  }
              }
              return false;
          });
  
          if (hasOverlap) {
              setIsOverlap(true);
              setOverlapMessage("This shift overlaps with another assigned shift.");
          } else {
              setIsOverlap(false);
              setOverlapMessage('');
          }
      }
  }
};

  return (
    <>
      <Modal show={isModalVisible} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>{key == null ? 'Add Shift' : 'Edit Shift'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="shiftDate">
              <Form.Label>Shift Date</Form.Label>
              <Form.Control 
                type="date"  
                value={shift.shiftDate}
                readOnly
                required 
              />
            </Form.Group>
            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control 
                type="time" 
                value={shift.startTime}
                onChange={handleInputChange}
                isInvalid={!!errors.startTime} 
                required 
              />
              {errors.startTime && (
                <Form.Control.Feedback type="invalid">
                  {errors.startTime}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control 
                type="time" 
                value={shift.endTime}
                onChange={handleInputChange}
                isInvalid={!!errors.endTime} 
                required 
              />
              {errors.endTime && (
                <Form.Control.Feedback type="invalid">
                  {errors.endTime}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="isHoliday">
              <Form.Check 
                type="checkbox" 
                label="Is Holiday?" 
                checked={shift.isHoliday}
                onChange={handleInputChange} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={(e) => handleDelete(e, key)}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!isFormValid || isOverlapShift}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isModalAttendVisible} onHide={hideModalAttend}>
        <Modal.Header closeButton>
          <Modal.Title>{key == null ? 'Add Shift' : 'Edit Shift'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="shiftDate">
              <Form.Label>Shift Date</Form.Label>
              <Form.Control 
                type="date"  
                value={shift.shiftDate}
                readOnly
                required 
                disabled={attend.empID !== 0}
              />
            </Form.Group>
            <Form.Group controlId="startTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control 
                type="time" 
                value={shift.startTime}
                onChange={handleInputChange}
                isInvalid={!!errors.startTime} 
                required 
                disabled={attend.empID !== 0}
              />
              {errors.startTime && (
                <Form.Control.Feedback type="invalid">
                  {errors.startTime}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="endTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control 
                type="time" 
                value={shift.endTime}
                onChange={handleInputChange}
                isInvalid={!!errors.endTime} 
                required 
                disabled={attend.empID !== 0}
              />
              {errors.endTime && (
                <Form.Control.Feedback type="invalid">
                  {errors.endTime}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="isHoliday">
              <Form.Check 
                type="checkbox" 
                label="Is Holiday?" 
                checked={shift.isHoliday}
                onChange={handleInputChange} 
                disabled={attend.empID !== 0}
              />
            </Form.Group>

            {/* Show overlap warning message if it exists */}
            {isOverlapShift && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                {overlapEditShiftMessage}
                </p>)}



            <div className="d-flex justify-content-end" style={{ width: '100%' }}>
            <Button variant="danger" onClick={(e) => handleDelete(e, key)} style={{ marginRight: '10px' }} disabled={attend.empID !== 0}>
            Delete
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={!isFormValid || isOverlapShift || attend.empID !== 0}>
              Save Changes
            </Button>
            </div>
            </Form>

          <hr/>

          {/* Second Form: Employee Assignment */}
          <Form onSubmit={handleAttendSubmit}>
          <Form.Group controlId="employeeSelect">
            <Form.Label>Assign Employee</Form.Label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Form.Control 
                as="select" 
                value={attend.empID || ""} // Set the assigned employee as default, or "Select Employee" if none
                onChange={handleEmployeeSelectChange}
                required
                style={{ flex: 1, marginRight: '10px' }} // Ensure the dropdown takes full width and has space for buttons
              >
                <option value="">Select Employee</option> {/* Default option */}
                {employees.map((employee) => (
                  <option key={employee.employeeID} value={employee.employeeID}>
                    [{employee.employeeID}] {employee.givenName} {employee.surname}
                  </option>
                ))}
              </Form.Control>
              
              {/* Assign Button */}
              <Button 
                variant="primary" 
                onClick={handleAttendSubmit} 
                style={{ marginRight: '10px' }} // Add spacing between buttons
                disabled={isOverlap}
              >
                Assign
              </Button>

              
              {/* Remove Button */}
              <Button 
                variant="danger" 
                onClick={handleRemoveAttend} // Assuming the remove logic doesn't need selectedEmployee (removes directly)
              >
                Remove
              </Button>
            </div>

            {/* Checkbox for CheckedIn */}
            <Form.Group controlId="checkedIn" style={{ marginTop: '15px' }}>
              <Form.Check 
                type="checkbox" 
                label="Checked In"
                checked={attend.checkedIn || false} 
                onChange={(e) => setAttend(prevAttend => ({
                  ...prevAttend,
                  checkedIn: e.target.checked ? true : false
                }))}
              />
            </Form.Group>

            {/* Overlap Message */}
            {isOverlap && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                {overlapMessage}
              </p>
            )}
          </Form.Group>
          </Form>

        </Modal.Body>



        <Modal.Footer>
        </Modal.Footer>

      </Modal>

      <WeeklySchedule style={{ padding: '24px' }} showDateNavigator events={events} onAddEvent={handleAddEvent} onClickEvent={handleClickEvent}/>
    </>

  );
}

export default ShiftScheduler;
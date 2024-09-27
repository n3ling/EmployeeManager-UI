import { useState, useEffect } from 'react';
import { ScheduleEventType, WeeklySchedule } from 'react-beautiful-schedule';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { addShift, updateShift, deleteShift } from '@/lib/shiftData';

function ShiftScheduler() {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState<ScheduleEventType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [key, setKey] = useState(0)
  const [errors, setErrors] = useState({ startTime: '', endTime: '' });
  const [isFormValid, setIsFormValid] = useState(true);
  const [shift, setShift] = useState({
    shiftID: 0, 
    shiftDate: '',
    startTime: '',
    endTime: '',
    isHoliday: false
  });

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

  const transformDataToEvents = (data) => {
    return {
      id: data.shiftID.toString(),
      title: `Shift ${data.shiftID}`,
      start: `${data.shiftDate}T${data.startTime}`,
      end: `${data.shiftDate}T${data.endTime}`,
      defaultTheme: data.isHoliday > 0 ? 'yellow' : 'blue'
    }
  }

  const transformAllData = (data) => {
    return data.map(shift => transformDataToEvents(shift));
  }

  const findHighestID = (data) => {
    if (data.length === 0) return 0; // Handle empty data

    return data.reduce((maxID, shift) => {
      return shift.shiftID > maxID ? shift.shiftID : maxID;
    }, 0);
  }

  useEffect(() => {
    fetch('https://employeemanager-y5z4.onrender.com/shift')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);
  
  useEffect(() => {
    if (data.length > 0) {
      const temp = transformAllData(data);
      setEvents(temp);
    }
  }, [data]); 

  console.log(events)

  function showModal() {
    setIsModalVisible(true)
  }

  function hideModal() {
    setIsModalVisible(false)
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
    console.log(shift);

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


  function handleClickEvent(day: Date, dayISO: string | null, event: ScheduleEventProps) {
    setKey(event.id)
    console.log(event.id)
    setShift({
      shiftID: event.id, 
      shiftDate: formatDate(day),
      startTime: event.start.split('T')[1],
      endTime: event.end.split('T')[1],
      isHoliday: event.defaultTheme == "blue"? false : true
    })
    showModal()
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
          <Button variant="primary" onClick={handleSubmit} disabled={!isFormValid}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <WeeklySchedule style={{ padding: '24px' }} showDateNavigator events={events} onAddEvent={handleAddEvent} onClickEvent={handleClickEvent}/>
    </>

  );
}

export default ShiftScheduler;
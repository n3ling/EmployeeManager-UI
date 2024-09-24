import { useState, useEffect } from 'react';
import { ScheduleEventType, WeeklySchedule } from 'react-beautiful-schedule';

// const eventsData = [
//   {
//     id: '1',
//     title: 'Event 1',
//     start: '2023-09-24T09:00:00',
//     end: '2023-09-24T10:15:00',
//   },
//   {
//     id: '2',
//     title: 'Event 2',
//     start: '2024-09-23T10:00:00',
//     end: '2024-09-23T11:30:00',
//     description: 'This is a description',
//     defaultTheme: 'yellow' as const,
//   },
// ];

function ShiftScheduler() {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState<ScheduleEventType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [key, setKey] = useState(0)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [clickedEvent, setClickedEvent] = useState<ScheduleEventProps | null>(null)
  const [tempEvent, setTempEvent] = useState<ScheduleEventProps | null>(null)

  useEffect(() => {
    fetch('https://employeemanager-y5z4.onrender.com/shift')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const transformDataToEvents = (data) => {
    return {
      id: data.shiftID.toString(),
      title: `Shift ${data.shiftID}`,
      start: `${data.shiftDate}T${data.startTime}`,
      end: `${data.shiftDate}T${data.endTime}`
    }
  }

  const transformAllData = (data) => {
    return data.map(shift => transformDataToEvents(shift));
  }

  useEffect(() => {
    const temp = transformAllData(data);
    setEvents(temp);
  }, []);


  function showModal() {
    setKey((prev) => prev + 1)
    setIsModalVisible(true)
  }

  function hideModal() {
    setIsModalVisible(false)
  }

  function handleAddEvent(date: Date) {
    setSelectedDate(date)
    setClickedEvent(null)
    setTempEvent(null)
    showModal()
  }

  function handleClickEvent(day: Date, dayISO: string | null, event: ScheduleEventProps) {
    console.log({ day, dayISO, event })
    setSelectedDate(day)
    setClickedEvent(event)
    showModal()
  }

  return (
    <>
      <WeeklySchedule
        style={{ padding: '24px' }}
        showDateNavigator
        events={events}
        onAddEvent={handleAddEvent}
        onClickEvent={handleClickEvent}
      />
    </>

  );
}

export default ShiftScheduler;
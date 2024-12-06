export async function  deleteAttendance(attendanceID) {
    const res = await fetch(`https://employeemanager-y5z4.onrender.com/attendance/delete/${attendanceID}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 200) {
        return true;
    } 
}

export async function  addAttendance(attendanceInfo) {
    const res = await fetch(`https://employeemanager-y5z4.onrender.com/attendance/add`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(attendanceInfo),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 200) {
        return true;
    } 
}

export async function updateAttendance(attendanceInfo) {
    try {
        const res = await fetch(`https://employeemanager-y5z4.onrender.com/attendance/update`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(attendanceInfo),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            const errorMessage = await res.text(); 
            throw new Error(`Error updating attendance: ${res.status} ${errorMessage}`);
        }

        const data = await res.json(); 
        return data; 

    } catch (error) {
        console.error("An error occurred while updating the attendance:", error);
        return null; 
    }
}

export async function updateCheckIn(attendanceInfo) {
    try {
        const res = await fetch(`https://employeemanager-y5z4.onrender.com/attendance/checkIn`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(attendanceInfo),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            const errorMessage = await res.text(); 
            throw new Error(`Error updating attendance: ${res.status} ${errorMessage}`);
        }

        const data = await res.json(); 
        return data; 

    } catch (error) {
        console.error("An error occurred while updating the attendance:", error);
        return null; 
    }
}
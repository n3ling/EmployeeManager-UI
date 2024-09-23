export async function  deleteShift(shiftID) {
    const res = await fetch(`https://employeemanager-y5z4.onrender.com/shift/delete/${shiftID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 200) {
        return true;
    } 
}

export async function  addShift(shiftInfo) {
    const res = await fetch(`https://employeemanager-y5z4.onrender.com/shift/add`, {
        method: 'POST',
        body: JSON.stringify(shiftInfo),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 200) {
        return true;
    } 
}

export async function updateShift(shiftInfo) {
    const res = await fetch(`https://employeemanager-y5z4.onrender.com/shift/update`, {
        method: 'POST',
        body: JSON.stringify(shiftInfo),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
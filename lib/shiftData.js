export async function  deleteShift(shiftID) {
    const res = await fetch(`https://employeemanager-y5z4.onrender.com/shift/delete/${shiftID}`, {
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

export async function  addShift(shiftInfo) {
    const res = await fetch(`https://employeemanager-y5z4.onrender.com/shift/add`, {
        method: 'POST',
        credentials: 'include',
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
    try {
        const res = await fetch(`https://employeemanager-y5z4.onrender.com/shift/update`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(shiftInfo),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            const errorMessage = await res.text(); 
            throw new Error(`Error updating shift: ${res.status} ${errorMessage}`);
        }

        const data = await res.json(); 
        return data; 

    } catch (error) {
        console.error("An error occurred while updating the shift:", error);
        return null; 
    }
}
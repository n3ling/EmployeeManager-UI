export async function  deleteEmployee(employeeID) {
    const res = await fetch(`https://employeemanager-y5z4.onrender.com/employees/delete/${employeeID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await res.json();

    if (res.status === 200) {
        return true;
    } else {
        throw new Error(data.message);
    }
}

export async function  addEmployee(employeeInfo) {
    const res = await fetch(`https://employeemanager-y5z4.onrender.com/employees/add`, {
        method: 'POST',
        body: JSON.stringify(employeeInfo),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 200) {
        return true;
    } else {
        throw new Error(data.message);
    }
}

export async function updateEmployee(employeeInfo) {
    const res = await fetch(`https://employeemanager-y5z4.onrender.com/employees/update`, {
        method: 'POST',
        body: JSON.stringify(employeeInfo),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
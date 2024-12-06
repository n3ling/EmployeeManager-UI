export async function  deleteEmployee(employeeID) {
    const res = await fetch(`https://employeemanager-y5z4.onrender.com/employees/delete/${employeeID}`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 200) {
        return true;
    } 
}

export async function  addEmployee(employeeInfo) {
    const res = await fetch(`https://employeemanager-y5z4.onrender.com/employees/add`, {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(employeeInfo),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (res.status === 200) {
        return true;
    } 
}

export async function updateEmployee(employeeInfo) {
    const res = await fetch(`https://employeemanager-y5z4.onrender.com/employees/update`, {
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(employeeInfo),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
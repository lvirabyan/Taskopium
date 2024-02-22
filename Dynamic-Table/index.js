const employees = [
    {
      id: 1,
      name: "John Doe",
      age: 30,
      department: "Engineering",
      role: { title: "Frontend Developer", level: "Mid" },
      contact: { email: "john.doe@example.com", phone: "123-456-7890" },
      skills: ["JavaScript", "React", "CSS"]
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      department: "Design",
      role: { title: "UI/UX Designer", level: "Senior" },
      contact: { email: "jane.smith@example.com", phone: "098-765-4321" },
      skills: ["Figma", "Sketch", "Adobe XD"]
    },
];
const tableContainer = document.getElementById('tableContainer');

function generateTableCell(value) {
    const cell = document.createElement('td');

    if (typeof value === 'object') {
        const innerTable = document.createElement('table');
        const innerKeys = Object.keys(value);

        innerKeys.forEach(innerKey => {
            const innerHeaderCell = document.createElement('th');
            innerHeaderCell.textContent = innerKey;

            const innerValueCell = document.createElement('td');
            innerValueCell.appendChild(generateTableCell(value[innerKey]));

            const innerRow = document.createElement('tr');
            innerRow.appendChild(innerHeaderCell);
            innerRow.appendChild(innerValueCell);

            innerTable.appendChild(innerRow);
        });

        cell.appendChild(innerTable);
    } else {
        cell.textContent = value;
    }

    return cell;
}

function generateTableRow(employee, keys) {
    const row = document.createElement('tr');

    keys.forEach(key => {
        const value = employee[key];

        const cell = generateTableCell(value);
        row.appendChild(cell);
    });

    return row;
}

function generateEmployeeTable(elements, tableContainer) {
    const table = document.createElement('table');
    tableContainer.appendChild(table);

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    const employeeKeys = Object.keys(elements[0]); 

    employeeKeys.forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    elements.forEach(element => {
        const row = generateTableRow(element, employeeKeys);
        tbody.appendChild(row);
    });
}

generateEmployeeTable(employees, tableContainer);

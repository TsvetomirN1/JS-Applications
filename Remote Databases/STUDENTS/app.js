const elements = {
    loadBtn: document.getElementById('loadStudents'),
    createBtn: document.querySelector('form button'),
    table: document.getElementById('results'),
    tableBody: document.querySelector('#results tbody'),
    id: document.getElementById('id'),
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    facultyNumber: document.getElementById('facultyNumber'),
    grade: document.getElementById('grade'),
}


const appID = 'Your ID';
const apiKey = 'Your Apikey';

const baseUrl = `https://api.backendless.com/${appID}/${apiKey}/data/students`;

const encryptedCredentials = this.btoa(`${username}:${password}`);

function responseHander(response) {
    if (response.status >= 400) {
        throw new Error(response.statusText);
    }
    return response.json();
}

function createHTMLElement(type, text) {
    let HTMLElement = document.createElement(type);

    if (text) {
        HTMLElement.textContent = text;
    }
    return HTMLElement;
}

function clearFormFields() {
    elements.id.value = '';
    elements.firstName.value = '';
    elements.lastName.value = '';
    elements.facultyNumber.value = '';
    elements.grade.value = '';
}
async function addStudent(e) {
    e.preventDefault();

    let id = elements.id.value
    let firstName = elements.firstName.value;
    let lastName = elements.lastName.value;
    let facultyNumber = elements.facultyNumber.value;
    let grade = elements.grade.value;

    let isValid = id && firstName && lastName && facultyNumber && grade;

    if (isValid) {
        let studentData = {
            id,
            firstName,
            lastName,
            facultyNumber,
            grade,
        }

        const fetchObj = {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${encryptedCredentials}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData),
        }

        await fetch(baseUrl, fetchObj)
            .then(responseHander)
            .then(loadStudents)
            .catch(err => alert(err));

        clearFormFields();
    }
}

function loadStudents() {
    elements.tableBody.innerHTML = "Loading";
    const fetchObj = {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${encryptedCredentials}`,
        },
    }
    fetch(baseUrl, fetchObj)
        .then(responseHander)
        .then(students => {
            elements.tableBody.innerHTML = "";
            students
                .sort((a, b) => a.id - b.id)
                .forEach((student) => {
                    let tr = document.createElement('tr');

                    let idTd = createHTMLElement('td', student.id);
                    tr.appendChild(idTd);
                    let firstNameTd = createHTMLElement('td', student.firstName);
                    tr.appendChild(firstNameTd);
                    let lastNameTd = createHTMLElement('td', student.lastName);
                    tr.appendChild(lastNameTd);
                    let facultyNumberTd = createHTMLElement('td', student.facultyNumber);
                    tr.appendChild(facultyNumberTd);
                    let gradeTd = createHTMLElement('td', student.grade);
                    tr.appendChild(gradeTd);

                    elements.table.querySelector('tbody').appendChild(tr);
                })
        });
}

elements.createBtn.addEventListener('click', addStudent);
elements.loadBtn.addEventListener('click', loadStudents);
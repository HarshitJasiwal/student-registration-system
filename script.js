const studentForm = document.getElementById("studentForm");
const studentTable = document.querySelector("#studentTable tbody");
let students = JSON.parse(localStorage.getItem("students")) || [];

function renderTable() {
  studentTable.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.className}</td>
      <td>${student.address}</td>
      <td>${student.contact}</td>
      <td>
        <button class="edit" onclick="editStudent(${index})">Edit</button>
        <button class="delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    studentTable.appendChild(row);
  });
}

function validateInputs(name, className, address, contact) {
  const nameRegex = /^[a-zA-Z ]+$/;
  const contactRegex = /^[0-9]{10}$/;

  if (!name || !className || !address || !contact) return false;
  if (!nameRegex.test(name)) return false;
  if (!contactRegex.test(contact)) return false;

  return true;
}

studentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const className = document.getElementById("className").value.trim();
  const address = document.getElementById("address").value.trim();
  const contact = document.getElementById("contact").value.trim();

  if (!validateInputs(name, className, address, contact)) {
    alert("Please enter valid data in all fields.");
    return;
  }

  students.push({ name, className, address, contact });
  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
  studentForm.reset();
});

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
}

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("className").value = student.className;
  document.getElementById("address").value = student.address;
  document.getElementById("contact").value = student.contact;

  students.splice(index, 1); 
  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
}

window.onload = renderTable;

let users = [];

// Check if data exists in local storage
if (localStorage.getItem('users')) {
  // Retrieve data from local storage
  users = JSON.parse(localStorage.getItem('users'));
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent form submission

  // Get form input values
  const name = document.getElementById('name').value;
  const idNumber = document.getElementById('idNumber').value;
  const country = document.getElementById('country').value;
  const language = document.getElementById('language').value;

  // Create a user object
  const user = {
    name,
    idNumber,
    country,
    language
  };

  // Add the user object to the array
  users.push(user);

  // Clear form inputs
  document.getElementById('name').value = '';
  document.getElementById('idNumber').value = '';
  document.getElementById('country').value = '';
  document.getElementById('language').value = '';

  // Save the updated user data to local storage
  localStorage.setItem('users', JSON.stringify(users));

  // Display the updated user list
  displayUserList();
}

// Function to display the user list
function displayUserList() {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  // Iterate over each user and create a table row for them
  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.idNumber}</td>
      <td>${user.country}</td>
      <td>${user.language}</td>
      <td class="button-box">
        <button class="edit-button" onclick="editUser(${i})">Edit</button>
        <button class="delete-button" onclick="deleteUser(${i})">Delete</button>
      </td>
    `;

    userList.appendChild(row);
  }
}

// Function to edit a user
function editUser(index) {
  const user = users[index];

  document.getElementById('name').value = user.name;
  document.getElementById('idNumber').value = user.idNumber;
  document.getElementById('country').value = user.country;
  document.getElementById('language').value = user.language;

  users.splice(index, 1);

  // Save the updated user data to local storage
  localStorage.setItem('users', JSON.stringify(users));

  displayUserList();
}

// Function to delete a user
function deleteUser(index) {
  users.splice(index, 1);

  // Save the updated user data to local storage
  localStorage.setItem('users', JSON.stringify(users));

  displayUserList();
}

// Display the initial user list
displayUserList();

// Add event listener to form submit
const form = document.getElementById('registrationForm');
form.addEventListener('submit', handleFormSubmit);

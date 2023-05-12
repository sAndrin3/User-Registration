// User data storage
let users = [];

// Register form submit event listener
document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const idNumber = document.getElementById('idNumber').value;
  const country = document.getElementById('country').value;
  const language = document.getElementById('language').value;

  const user = {
    name,
    idNumber,
    country,
    language
  };

  // Add user to the list
  users.push(user);

  // Save users to local storage
  saveUsers();

  // Clear form inputs
  document.getElementById('name').value = '';
  document.getElementById('idNumber').value = '';
  document.getElementById('country').value = '';
  document.getElementById('language').value = '';

  // Display updated user list
  displayUserList();
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
  
    const row = document.createElement('tr');
    row.classList.add('table-row'); // Add the 'table-row' class
  
    // ...
  }

  showMessage('success', 'User registered successfully!');
});

// Function to save users to local storage
function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

// Function to retrieve users from local storage
function retrieveUsers() {
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }
}

// Function to delete a user
function deleteUser(index) {
  // Remove user from the list
  users.splice(index, 1);

  // Save users to local storage
  saveUsers();

  // Display updated user list
  displayUserList();

  showMessage('success', 'User deleted successfully!');
}

// Function to edit a user
function editUser(index) {
  // Retrieve user data
  const user = users[index];

  // Set form values for editing
  document.getElementById('name').value = user.name;
  document.getElementById('idNumber').value = user.idNumber;
  document.getElementById('country').value = user.country;
  document.getElementById('language').value = user.language;

  // Remove user from the list
  users.splice(index, 1);

  // Save users to local storage
  saveUsers();

  // Display updated user list
  displayUserList();

  showMessage('info', 'Editing user...');
}

// Function to display the user list
function displayUserList() {
  // Retrieve users from local storage
  retrieveUsers();

  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.idNumber}</td>
      <td>${user.country}</td>
      <td>${user.language}</td>
      <td>
        <div class="button-box">
          <button class="edit-button" onclick="editUser(${i})">Edit</button>
          <button class="delete-button" onclick="deleteUser(${i})">Delete</button>
        </div>
      </td>
    `;

    userList.appendChild(row);
  }
}

// Function to show messages
function showMessage(type, message) {
  const messageContainer = document.createElement('div');
  messageContainer.className = type;
  messageContainer.textContent = message;

  const container = document.querySelector('.container');
  container.insertBefore(messageContainer, document.getElementById('registrationForm'));

  // Remove message after 3 seconds
  setTimeout(function() {
    messageContainer.remove();
  }, 3000)};

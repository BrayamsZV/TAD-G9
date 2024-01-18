const apiUrl = 'http://localhost:8000/user';

function getUsers() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => displayUsers(users))
        .catch(error => console.error('Error fetching users:', error));
}

function displayUsers(users) {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '<h2>Users</h2>';

    if (users.length === 0) {
        usersList.innerHTML += '<p>No users found.</p>';
    } else {
        users.forEach(user => {
            const userContainer = document.createElement('div');
            userContainer.innerHTML = `
                <p>${user.firstName} ${user.lastName} - ${user.email}</p>
                <button onclick="deleteUser(${user.id})">Delete</button>
            `;
            usersList.appendChild(userContainer);
        });
    }
}

function saveUser(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
    .then(response => response.json())
    .then(savedUser => {
        console.log('User saved:', savedUser);
        getUsers(); // Refrescar la lista después de guardar
    })
    .catch(error => console.error('Error saving user:', error));
}

function deleteUser(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log(`User with ID ${id} deleted successfully.`);
            getUsers(); // Refrescar la lista después de la eliminación
        } else {
            console.error(`Error deleting user with ID ${id}.`);
        }
    })
    .catch(error => console.error('Error deleting user:', error));
}
const apiUrl = 'http://localhost:8000/user';

function getUsers() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(users => displayUsers(users))
        .catch(error => console.error('Error al recuperar usuario:', error));
}

function displayUsers(users) {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '<h2>Usuarios</h2>';

    if (users.length === 0) {
        usersList.innerHTML += '<p>No se encontraron usuarios.</p>';
    } else {
        users.forEach(user => {
            const userContainer = document.createElement('div');
            userContainer.innerHTML = `
                <p>${user.firstName} ${user.lastName} - ${user.email}</p>
                <button onclick="deleteUser(${user.id})">Eliminar</button>
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
        console.log('Usuario guardado:', savedUser);
        getUsers(); // Refrescar la lista después de guardar
    })
    .catch(error => console.error('Error, no se puedo guardar:', error));
}

function deleteUser(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            console.log(`Usuario con ID ${id} eliminado exitosamente.`);
            getUsers(); // Refrescar la lista después de la eliminación
        } else {
            console.error(`Error al eliminar usuario con ID ${id}.`);
        }
    })
    .catch(error => console.error('Error al eliminar usuario:', error));
}
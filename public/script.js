let characters = JSON.parse(localStorage.getItem('characters')) || [];

document.getElementById('characterForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const profession = document.getElementById('profession').value;
    const socialClass = document.getElementById('socialClass').value;
    const strength = document.getElementById('strength').value;
    const agility = document.getElementById('agility').value;
    const intelligence = document.getElementById('intelligence').value;
    const charisma = document.getElementById('charisma').value;

    if (characters.length < 10) {
        const newCharacter = {
            id: Date.now(),
            name,
            profession,
            socialClass,
            strength,
            agility,
            intelligence,
            charisma
        };

        characters.push(newCharacter);
        localStorage.setItem('characters', JSON.stringify(characters));
        displayCharacters();
        document.getElementById('characterForm').reset();
    } else {
        alert("Se ha alcanzado el límite de 10 personajes.");
    }
});

function displayCharacters() {
    const characterList = document.getElementById('characters');
    characterList.innerHTML = '';
    characters.forEach((character, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            Personaje ${index + 1}: ${character.name} (${character.profession}) - Clase Social: ${character.socialClass}
            <button onclick="selectCharacter(${character.id})">Seleccionar</button>
            <button onclick="editCharacter(${character.id})">Editar</button>
            <button onclick="deleteCharacter(${character.id})">Eliminar</button>
        `;
        characterList.appendChild(listItem);
    });
}

function selectCharacter(id) {
    const selectedCharacter = characters.find(character => character.id === id);
    alert(`Personaje seleccionado: ${selectedCharacter.name}`);
    // Aquí puedes añadir la lógica para comenzar el juego con este personaje
}

function editCharacter(id) {
    const characterToEdit = characters.find(character => character.id === id);
    // Puedes rellenar el formulario con los valores del personaje seleccionado para editar
    document.getElementById('name').value = characterToEdit.name;
    document.getElementById('profession').value = characterToEdit.profession;
    document.getElementById('socialClass').value = characterToEdit.socialClass;
    document.getElementById('strength').value = characterToEdit.strength;
    document.getElementById('agility').value = characterToEdit.agility;
    document.getElementById('intelligence').value = characterToEdit.intelligence;
    document.getElementById('charisma').value = characterToEdit.charisma;

    // Elimina el personaje antiguo y permite guardar el nuevo editado
    deleteCharacter(id);
}

function deleteCharacter(id) {
    characters = characters.filter(character => character.id !== id);
    localStorage.setItem('characters', JSON.stringify(characters));
    displayCharacters();
}

document.getElementById('startGame').addEventListener('click', function () {
    if (characters.length > 0) {
        alert("Comenzando el juego...");
        // Lógica para comenzar el juego con los personajes seleccionados
    } else {
        alert("Por favor, crea y selecciona al menos un personaje.");
    }
});

// Inicializar la lista de personajes en la carga de la página
displayCharacters();
let characters = JSON.parse(localStorage.getItem('characters')) || [];

document.getElementById('characterForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const profession = document.getElementById('profession').value;
    const socialClass = document.getElementById('socialClass').value;
    const strength = document.getElementById('strength').value;
    const agility = document.getElementById('agility').value;
    const intelligence = document.getElementById('intelligence').value;
    const charisma = document.getElementById('charisma').value;

    if (characters.length < 10) {
        const newCharacter = {
            id: Date.now(),
            name,
            profession,
            socialClass,
            strength,
            agility,
            intelligence,
            charisma
        };

        characters.push(newCharacter);
        localStorage.setItem('characters', JSON.stringify(characters));
        displayCharacters();
        document.getElementById('characterForm').reset();
    } else {
        alert("Se ha alcanzado el límite de 10 personajes.");
    }
});

function displayCharacters() {
    const characterList = document.getElementById('characters');
    characterList.innerHTML = '';
    characters.forEach((character, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            Personaje ${index + 1}: ${character.name} (${character.profession}) - Clase Social: ${character.socialClass}
            <button onclick="selectCharacter(${character.id})">Seleccionar</button>
            <button onclick="editCharacter(${character.id})">Editar</button>
            <button onclick="deleteCharacter(${character.id})">Eliminar</button>
        `;
        characterList.appendChild(listItem);
    });
}

function selectCharacter(id) {
    const selectedCharacter = characters.find(character => character.id === id);
    alert(`Personaje seleccionado: ${selectedCharacter.name}`);
    // Aquí puedes añadir la lógica para comenzar el juego con este personaje
}

function editCharacter(id) {
    const characterToEdit = characters.find(character => character.id === id);
    // Puedes rellenar el formulario con los valores del personaje seleccionado para editar
    document.getElementById('name').value = characterToEdit.name;
    document.getElementById('profession').value = characterToEdit.profession;
    document.getElementById('socialClass').value = characterToEdit.socialClass;
    document.getElementById('strength').value = characterToEdit.strength;
    document.getElementById('agility').value = characterToEdit.agility;
    document.getElementById('intelligence').value = characterToEdit.intelligence;
    document.getElementById('charisma').value = characterToEdit.charisma;

    // Elimina el personaje antiguo y permite guardar el nuevo editado
    deleteCharacter(id);
}

function deleteCharacter(id) {
    characters = characters.filter(character => character.id !== id);
    localStorage.setItem('characters', JSON.stringify(characters));
    displayCharacters();
}

document.getElementById('startGame').addEventListener('click', function () {
    if (characters.length > 0) {
        alert("Comenzando el juego...");
        // Lógica para comenzar el juego con los personajes seleccionados
    } else {
        alert("Por favor, crea y selecciona al menos un personaje.");
    }
});

// Inicializar la lista de personajes en la carga de la página
displayCharacters();

const socket = io();

document.getElementById('chatForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const message = document.getElementById('chatInput').value;
    socket.emit('chat message', message);
    document.getElementById('chatInput').value = '';
});

socket.on('chat message', function (msg) {
    const chatMessages = document.getElementById('chatMessages');
    const messageItem = document.createElement('div');
    messageItem.textContent = msg;
    chatMessages.appendChild(messageItem);
});
document.getElementById('rollDice').addEventListener('click', function () {
    const diceType = document.getElementById('diceType').value;
    const result = rollDice(diceType);
    document.getElementById('diceResult').textContent = `Has tirado un D${diceType} y obtuviste un ${result}`;
});

function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}
const socket = io();

document.getElementById('chatForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const message = document.getElementById('chatInput').value;
    socket.emit('chat message', message);
    document.getElementById('chatInput').value = '';
});

socket.on('chat message', function (msg) {
    const chatMessages = document.getElementById('chatMessages');
    const messageItem = document.createElement('div');
    messageItem.textContent = msg;
    chatMessages.appendChild(messageItem);
});

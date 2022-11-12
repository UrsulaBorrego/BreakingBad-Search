// 'use strict';

// //QUERYSELECTORS

// const btn = document.querySelector('.js-button-search');
// const characterList = document.querySelector('.js-characters-list');

// //VARIABLES GLOBALES

// const oneCharacter = {
//     id: 1,
//     name: 'Walter White',
//     photo: 'https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg',
//     status: 'Presumed dead',
// };

// //FUNCIONES

// //Función que pinta cada personaje
// function renderOneCharacter() {
// characterList.innerHTML = 
// `<li>
// <article class="character selected">
//   <img src=${oneCharacter.photo} alt="" class="photo">
//   <h3 class="name">${oneCharacter.name}</h3>
//   <p class="status">${oneCharacter.status}</p>
// </article>
// </li>`;
// };

// //ADDEVENTLISTENERS

// //CÓDIGO QUE SE EJECUTA AL CARGAR LA PÁGINA
// renderOneCharacter();




///////////EN BASE AL EJERCICIO CAMISETAS 
'use strict';

//QUERYSELECTORS

//Input Search
const inputSearch = document.querySelector('.js-input-search');
//Botón Search
const btnSearch = document.querySelector('.js-button-search');
//Ul de los personajes
const characterList = document.querySelector('.js-characters-list');


//VARIABLES GLOBALES (vacías, para rellenar con API)

//Personajes
let allCharacters = [];
//Personajes favoritos
let favouriteCharacters = [];

//FUNCIONES

// //Función que coge las variables del API
// const getCharacterHtmlCode = (character) => {
//     let htmlCode = '';
//     `<li>
//     <article class="character selected">
//     <img src=${oneCharacter.photo} alt="" class="photo">
//     <h3 class="name">${oneCharacter.name}</h3>
//     <p class="status">${oneCharacter.status}</p>
//     </article>
//     </li>`;
// };

//Función para traer los datos de los personajes del API
const getApiData = () => {
    fetch('https://breakingbadapi.com/api/characters')
    .then(response => response.json())
    .then(data => {
        allCharacters = data; //TRAE BIEN LOS PERSONAJES DE LA API
        characterList.innerHTML = JSON.stringify(allCharacters); //ME PINTA TODOS LOS OBJETOS
        // paintCharacters();
        console.log(characterList);
    });
};

//Función para pintar los personajes      /////REVISAR ESTE FOR

const paintCharacters = () => {


};

// const paintCharacters = () => {
//     let charactersCode = '';
//     for (const character of characters) {
//         charactersCode += getCharacterHtmlCode(character);
//     }
//     characterList.innerHTML = charactersCode;
// };

//ADDEVENTLISTENERS



//CÓDIGO QUE SE EJECUTA AL CARGAR LA PÁGINA

getApiData();
// paintCharacters();
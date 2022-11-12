'use strict';

//QUERYSELECTORS

//Input Search
const inputSearch = document.querySelector('.js-input-search');
//Botón Search
const btnSearch = document.querySelector('.js-button-search');
//Ul de los personajes
let characterList = document.querySelector('.js-characters-list');

//VARIABLES GLOBALES (vacías, para rellenar con API)

//Personajes
let allCharacters = [];
//Personajes favoritos
// let favouriteCharacters = [];
//Tarjeta de cada personaje
let characterCard = '';
//Recoje el valor del input
let textInput = '';


//Función para pintar los personajes
const renderCharacters = () => {
  let characterCardContent = '';
  characterCard = '';
  characterList.innerHTML = '';
  //Bucle para recorrer el API
  for (const character of allCharacters) {
    characterCardContent = `<li>
        <article class="character selected">
        <img src='${character.img}' alt="" class="photo">
        <h3 class="name">${character.name}</h3>
        <p class="status">${character.status}</p>
        </article>
        </li>`;
    //Meto el contenido en cada tarjeta
    characterCard += characterCardContent;
    //Pinto las tarjetas en el ul
    characterList.innerHTML = characterCard;
  }
};

//Función para traer los datos de los personajes del API
const getApiData = () => {
  allCharacters= [];
  fetch('https://breakingbadapi.com/api/characters')
    .then((response) => response.json())
    .then((data) => {
      allCharacters.push(...data); //Agrego un array a otro array
      //characterList.innerHTML = JSON.stringify(allCharacters); //ME PINTA TODOS LOS OBJETOS
      renderCharacters();
    });
};

//Función para buscar en el input
const searchCharacter = (event) => {
  event.preventDefault();
  textInput = inputSearch.value;
  //Filtro el contenido del input por nombre y pinto solo los filtrados
  let filterResult = allCharacters.filter(character=>character.name.includes(textInput));
  allCharacters = filterResult;
  renderCharacters();
};

//ADDEVENTLISTENERS
btnSearch.addEventListener('click',searchCharacter);

//CÓDIGO QUE SE EJECUTA AL CARGAR LA PÁGINA
getApiData();
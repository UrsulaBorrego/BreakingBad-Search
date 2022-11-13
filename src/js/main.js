'use strict';

//QUERYSELECTORS

//Input Search
const inputSearch = document.querySelector('.js-input-search');
//Botón Search
const btnSearch = document.querySelector('.js-button-search');
//Ul de la lista los personajes
let characterList = document.querySelector('.js-characters-list');

//VARIABLES GLOBALES (vacías, para rellenar con API)

//Personajes
let allCharacters = [];
//Personajes favoritos
let favouriteCharacters = [];
//Tarjeta de cada personaje
let characterCard = '';
//Recoje el valor del input
let textInput = '';


//Función para pintar los personajes
const renderAllCharacters = () => {
  let characterCardContent = '';
  characterCard = '';
  characterList.innerHTML = '';
  //Bucle para recorrer el API
  for (const character of allCharacters) {
    characterCardContent = `<li>
        <article class="js-character character">
        <img src='${character.img}' alt="Foto de personaje" class="photo">
        <h3 class="name">${character.name}</h3>
        <p class="status">${character.status}</p>
        </article>
        </li>`;
    //Meto el contenido en cada tarjeta
    characterCard += characterCardContent;
    //Pinto las tarjetas en el ul
    characterList.innerHTML = characterCard;
  }
  //Llamo a la función que añade los listeners a las tarjetas
  addCharactersListeners();
};

//Función para traer los datos de los personajes del API
const getApiData = () => {
  allCharacters= [];
  fetch('https://breakingbadapi.com/api/characters')
    .then((response) => response.json())
    .then((data) => {
      allCharacters.push(...data); //Agrego un array a otro array
      //characterList.innerHTML = JSON.stringify(allCharacters); //ME PINTA TODOS LOS OBJETOS
      renderAllCharacters();
    });
};

//Función para buscar en el input
const searchCharacter = (event) => {
  event.preventDefault();
  textInput = inputSearch.value;
  //Filtro el contenido del input por nombre y pinto solo los filtrados
  let filterResult = allCharacters.filter(character=>character.name.includes(textInput));
  allCharacters = filterResult;
  renderAllCharacters();
};

//Función para seleccionar favoritos
function handleClickCard(event) {
  //Añade o quita clase selected a cada artículo
  event.currentTarget.classList.toggle('selected');
  console.log('Has hecho click');
  console.log(event.currentTarget.id);
};

//ADDEVENTLISTENERS
//Escucha al botón Search
btnSearch.addEventListener('click',searchCharacter);

//Función para añadir listeners a personajes
function addCharactersListeners() {
  const allCharactersArticles = document.querySelectorAll('.js-character');
  //Bucle que recorre todos los artículos y les pone Listener a cada uno
  for (const eachCharacterArticle of allCharactersArticles) {
    eachCharacterArticle.addEventListener('click', handleClickCard);
  }
};


//CÓDIGO QUE SE EJECUTA AL CARGAR LA PÁGINA
getApiData();
handleClickCard();
'use strict';

//QUERYSELECTORS

//Input Search
const inputSearch = document.querySelector('.js-input-search');
//Botón Search
const btnSearch = document.querySelector('.js-button-search');
//Ul de la lista los personajes
let characterList = document.querySelector('.js-characters-list');
//Ul de la lista de favoritos
let favouritesList = document.querySelector('.js-favourites-list');
//Botón Reset
const btnReset = document.querySelector('.js-button-reset');

//VARIABLES GLOBALES (vacías, para rellenar con API)

//Personajes
let allCharacters = [];
//Personajes favoritos
let favouriteCharacters = [];
//Tarjeta de cada personaje
let characterCard = '';
//Recoje el valor del input
let textInput = '';

//FUNCIONES

//Función para pintar los personajes
const renderAllCharacters = () => {

  let characterCardContent = '';
  characterCard = '';
  characterList.innerHTML = '';
  //Bucle para recorrer el API
  for (const character of allCharacters) {

    ////Para que se queden marcadas como favoritas las almacenadas en localStorage:
    //Para saber si es favorita o no: recorre cada objeto de favouriteCharacters y devuelve en una const el que tiene el id donde he hecho click
    const characterInFavouritesIndex = favouriteCharacters.findIndex((eachCharacterObj) => eachCharacterObj.char_id === parseInt(character.char_id));
    //Variable que contiene clase
    let classFavourite = '';
    //Condicional que comprueba si un personaje está marcado como Favorito o no
    if (characterInFavouritesIndex === -1) {
      classFavourite = '';
    } else {
      classFavourite = 'selected';
    }

    characterCardContent = `<li>
        <article class="js-character ${classFavourite} character" id="${character.char_id}">
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

//Función para pintar los favoritos
function renderFavouritesCharacters() {
  let characterCardContent = '';
  characterCard = '';
  favouritesList.innerHTML = '';
  //Bucle para recorrer el API
  for (const character of favouriteCharacters) {
    characterCardContent = `<li>
        <article class="js-character selected character" id="${character.char_id}" data-id="${character.char_id}">
        <img src='${character.img}' alt="Foto de personaje" class="photo">
        <h3 class="name">${character.name}</h3>
        <p class="status">${character.status}</p>
        </article>
        </li>`;
    //Meto el contenido en cada tarjeta
    characterCard += characterCardContent;
    //Pinto las tarjetas en el ul
    favouritesList.innerHTML = characterCard;
  }
}

//Función para traer los datos de los personajes del API
const getApiData = () => {
  allCharacters= [];
  fetch('https://breakingbadapi.com/api/characters')
    .then((response) => response.json())
    .then((data) => {
      allCharacters.push(...data); //Agrego un array a otro array
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

  //Recorre cada objeto de allCharacters y devuelve en una const el que tiene el id donde he hecho click
  const selectedCharacter = allCharacters.find((eachCharacterObj) => eachCharacterObj.char_id === parseInt(event.currentTarget.id));
  //Igual pero recorriendo favouriteCharacters
  const characterInFavouritesIndex = favouriteCharacters.findIndex((eachCharacterObj) => eachCharacterObj.char_id === parseInt(event.currentTarget.id));

  //Condicional si el objeto no está en Favoritos(lo meta), si está(lo saque)
  if (characterInFavouritesIndex === -1) {
    //Le pongo el objeto en Favoritos
    favouriteCharacters.push(selectedCharacter);
  } else {
    //Le quito el objeto de Favoritos
    favouriteCharacters.splice(characterInFavouritesIndex, 1);
  }

  //localStorage para guardar los Favoritos, pasando el array a texto con stringify
  localStorage.setItem('localFavouriteCharacters', JSON.stringify(favouriteCharacters));

  //Pinto los favoritos
  renderFavouritesCharacters();
}

//Función para borrar favoritos con botón reset
function deleteFavourites(event) {
  event.preventDefault();
  favouritesList.innerHTML = '';
  favouriteCharacters = [];
  localStorage.clear();
  //Vuelvo a pintar todo el listado para quitar selected de allCharacters
  renderAllCharacters();
}


//ADDEVENTLISTENERS

//Escucha al botón Search
btnSearch.addEventListener('click',searchCharacter);

//Escucha al botón Reset
btnReset.addEventListener('click',deleteFavourites);

//Función para añadir listeners a personajes
function addCharactersListeners() {
  const allCharactersArticles = document.querySelectorAll('.js-character');
  //Bucle que recorre todos los artículos y les pone Listener a cada uno
  for (const eachCharacterArticle of allCharactersArticles) {
    eachCharacterArticle.addEventListener('click', handleClickCard);
  }
}


//CÓDIGO QUE SE EJECUTA AL CARGAR LA PÁGINA

//Recupera los Favoritos marcados aunque se actualice la página,
//y con parse lo transforma a objeto
const savedFavourites = JSON.parse(localStorage.getItem('localFavouriteCharacters'));

//Condicional para ver si localStorage es null
if (savedFavourites !== null) {   //!== es ≠
  favouriteCharacters = savedFavourites;
  renderFavouritesCharacters();
}

getApiData();
handleClickCard();
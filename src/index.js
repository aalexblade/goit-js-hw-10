import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountry } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const inputRef = document.querySelector('#search-box');
const itemRef = document.querySelector('.country-item');

inputRef.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));
function searchCountry(event) {
  clearCountry()
  const countryName = inputRef.value.trim().toLowerCase();
  fetchCountry(countryName).then(showCountry)
  .catch(fetchError);
};

function clearCountry() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
};

function fetchError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function showCountry(country) {
  if (country.length === 1) {
    countryInfo.innerHTML = addInfo(country[0]);
  };  

  if (country.length > 1 && country.length <=10) {
      countryList.innerHTML = addList(country);
  };

  if (country.length > 10) {
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
  }; 
};

function addList(country) {
  return country.map(({flags, name}) => {return `
  <li class='country-item'>
  <img src ='${flags.svg}' alt = '${name.official}' class='country-flag' width =60px height 40px>${name.official}
  </li>`})
  .join('');
};
 
function addInfo(country) {
  const {name, flags, capital, population, languages} = country;
  return `<div class='country-name'>
  <img src ='${flags.svg}' alt = '${name.official}'>
  <h1 class='title'>${name.official}</h1>
  </div>
  <div class='description'>
  <p>Capital : ${capital}</p>
  <p>Population : ${population}</p>
  <p>Languages : ${Object.values(languages)}</p>
  </div>`;
};

countryList.addEventListener('click', chooseCountry);

function chooseCountry(event) {
    clearCountry()
    const countryName = event.target.textContent.trim().toLowerCase();
    fetchCountry(countryName).then(showCountry)
    .catch(fetchError);
}
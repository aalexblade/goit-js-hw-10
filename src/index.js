import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { markupCountryCard, markupCountryList } from './js/markup';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryCardEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
countryListEl.addEventListener('click', onClickCountry);


function onSearch(event) {
  const countryName = event.target.value.trim();
  
    if (countryName) {
      fetchCountries(countryName)
        .then(countries => {
          checkCountry(countries);
        })
    }
    else {clearList()}
}

function clearList () {
  countryListEl.innerHTML = '';
  countryCardEl.innerHTML = '';
}

function checkCountry(countries) {
  clearList();

  if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length > 1) {
    countryListEl.innerHTML = markupCountryList(countries);
  } else if (countries.length === 1) {
    countryCardEl.innerHTML = markupCountryCard(countries[0]);
  } else {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
}

function onClickCountry(event) {
  inputEl.value = event.target.dataset.name.trim();
  onSearch({ target: inputEl });
}


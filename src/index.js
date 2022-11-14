// import './css/styles.css';
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';

// import { fetchCountries } from './js/fetchCountries';

// const DEBOUNCE_DELAY = 300;

// const refs = {
//   inputEl: document.querySelector('input#search-box'),
//   countryListEl: document.querySelector('.country-list'),
//   countryInfoEl: document.querySelector('.country-info'),
// };

// refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// function onInput(evt) {
//   cleanCountresEl();
//   const countryName = evt.target.value.trim();
//   if (countryName !== '') {
//     fetchCountries(countryName).then(data => {
//       if (data.length > 10) {
//         Notiflix.Notify.info(
//           'Too many matches found. Please enter a more specific name.'
//         );
//       } else if (data.length >= 2 && data.length <= 10) {
//         const markup = createCountresList(data);
//         addMurkup(refs.countryListEl, markup);
//       } else if (data.length === 1) {
//         const markup = createOneCountryInfo(data);
//         addMurkup(refs.countryInfoEl, markup);
//       } else if (data.length === 0) {
//         Notiflix.Notify.failure('Oops, there is no country with that name');
//       }
//     });
//   }
// }

// function createCountresList(arr) {
//   return arr
//     .map(({ flags: { svg }, name: { official } }) => {
//       return `<li>
//       <img src="${svg}" alt="Flag of ${official}" width="150" hight="100">
//          <b>${official}</b>
//                 </li>`;
//     })
//     .join('');
// }

// function createOneCountryInfo(arr) {
//   return arr
//     .map(
//       ({
//         flags: { svg },
//         name: { official },
//         capital,
//         population,
//         languages,
//       }) => {
//         return `
//      <div class="wrap"> <img src="${svg}" alt="Flag of ${official}" width="300" hight="200">
//          <h2 class="country-name">${official}</h2></div>
// <p><b>capital:</b> ${capital} </p>
// <p><b>population:</b> ${population
//           .toString()
//           .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} </p>
// <p><b>languages:</b> ${Object.values(languages)} </p> `;
//       }
//     )
//     .join('');
// }

// function addMurkup(element, murkup) {
//   return (element.innerHTML = murkup);
// }

// function cleanCountresEl() {
//   refs.countryListEl.innerHTML = '';
//   refs.countryInfoEl.innerHTML = '';
// }


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


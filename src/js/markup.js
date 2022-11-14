function markupCountryList(countries) {
    
    return countries
      .map(
        country => `
        <li class="country-list__item">
          <a href="#" class="country-list__link" data-name="${country.name.official}">
            <img src="${country.flags.svg}" class="country-list__image" width="80" alt="flag ${country.name.official}" data-name="${country.name.official}">
            <p class="country-list__name" data-name="${country.name.official}">${country.name.official}</p>
          </a>
        </li>`
      )
      .join('');
  }
  
function markupCountryCard({ languages, flags, name, capital, population }) {
    
    return `
      <div class="country-card">
        <img class="country-card__image" width="120" src="${flags.svg}" alt="${name.official}">
        <p class="country-card__title">${name.official}</p>
        <p class="country-card__data"> Capital: ${capital}</p>
        <p class="country-card__data"> Population: ${population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
        <p class="country-card__data"> Languages: ${Object.values(languages)}</p></div>`;
  }
  
  export { markupCountryList, markupCountryCard };
  
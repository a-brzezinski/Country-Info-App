import '../scss/main.scss';
import { API_URL, MESSAGE_ERROR } from './config';

const searchForm = document.querySelector('.search');
const inputElement = document.querySelector('.search__field');
const errorItem = document.querySelector('.header__error');
const results = document.querySelector('.results');

const renderCountry = data => {
	results.classList.add('showResults');
	const html = `
				<div class="results__item">
          <p class="results__item__name desktop__name">Name</p>
          <p class="results__item__data desktop__data">${data.name}</p>
        </div>
        <div class="results__item">
          <p class="results__item__name">Flag</p>
          <img class="results__item__flag" src="${
						data.flag
					}" alt="Country flag">
        </div>
        <div class="results__item">
          <p class="results__item__name">Capital</p>
          <p class="results__item__data">${data.capital}</p>
        </div>
        <div class="results__item">
          <p class="results__item__name">Native Name</p>
          <p class="results__item__data">${data.nativeName}</p>
        </div>
        <div class="results__item">
          <p class="results__item__name">Population</p>
          <p class="results__item__data">${(data.population / 1000000).toFixed(
						2
					)} MLN</p>
        </div>
        <div class="results__item">
          <p class="results__item__name">Currency</p>
          <p class="results__item__data">${data.currencies[0].code}</p>
        </div>
        <div class="results__item">
          <p class="results__item__name">Region</p>
          <p class="results__item__data">${data.region}</p>
        </div>
	`;
	results.innerHTML = '';
	results.insertAdjacentHTML('beforeend', html);
	inputElement.value = '';
};

const handlingError = message => {
	errorItem.textContent = message;
	inputElement.value = '';
};

const getCountries = async name => {
	const fetchCountryData = await fetch(`${API_URL}${name}`);
	if (!fetchCountryData.ok) {
		throw handlingError(MESSAGE_ERROR);
	}

	const fetchedData = await fetchCountryData.json();
	const data = fetchedData[0];
	renderCountry(data);
	handlingError('');

	try {
	} catch (err) {
		console.error(err);
	}
};

searchForm.addEventListener('submit', e => {
	e.preventDefault();
	const inputValue = inputElement.value;
	if (inputValue.trim('') === '') return;
	getCountries(inputValue);
	inputElement.innerHTML = '';
});

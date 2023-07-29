import { fetchBreeds, fetchCatByBreed } from './cat-api';

const selectElement = document.querySelector('select.breed-select');
const catInfoElement = document.querySelector('div.cat-info');
const loaderElement = document.querySelector('p.loader');
const errorElement = document.querySelector('p.error');

async function generateOptions() {
  let options = '';

  const { data } = await fetchBreeds();
  data.forEach(({ id, name }) => {
    options += `<option value=${id}>${name}</option>`;
  });

  return options;
}

async function insertOptionsToSelect() {
  try {
    const data = await generateOptions();
    selectElement.insertAdjacentHTML('afterbegin', data);
    loaderElement.classList.toggle('toggle-js');
    selectElement.classList.toggle('toggle-js');
  } catch (error) {
    loaderElement.classList.toggle('toggle-js');
    errorElement.classList.toggle('toggle-js');
    console.error('error', error);
  }
}
insertOptionsToSelect();

selectElement.addEventListener('change', async e => {
  loaderElement.classList.toggle('toggle-js');
  catInfoElement.classList.toggle('toggle-js');
  const id = e.target.value;

  try {
    const { data } = await fetchCatByBreed(id);
    const catName = data[0].breeds[0].name;
    loaderElement.classList.toggle('toggle-js');
    catInfoElement.innerHTML = `<img src='${data[0].url}' alt='${catName}' width='460' height="380" /><div><h1>${catName}</h1><p>${data[0].breeds[0].description}</p><p><b>Temperament:</b> ${data[0].breeds[0].temperament}</p></div>`;
    catInfoElement.classList.toggle('toggle-js');
  } catch (error) {
    loaderElement.classList.toggle('toggle-js');
    errorElement.classList.toggle('toggle-js');
    console.error('error', error);
  }
});

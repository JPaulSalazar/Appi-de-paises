/* funcion para añadir peliculas */
function addCountry(data) {
  const countryList = document.getElementById('lista-paises');
  /* si se recarga la pagina que aparesca en blanco la pagina */
  countryList.innerHTML = '';
  /* recorrer movie para añadir los elementos al DOM */
  for (let i = 0; i < data.length; i += 1) {
    const listItem = document.createElement('li');
    /* fetch para la informacion extra */
    countryList.appendChild(listItem);
    /* nuevo contenido añadido al DOM */
    const content = `
      <div class="divCountry">
        <h2>${data[i].name}</h2>
        <a id="${data[i].name}">MAS INFORMACION</a>
      </div>
      <div class="modal" id="${data[i].name}modal">
        <ul id="lista-paises">
        <li>
          <p>Bandera:</p>
          <img src="${data[i].flag}" alt="bandera">
        </li>
        <li>
          <p>Capital:${data[i].capital}</p>
        </li>
        <li>
          <p>Region:${data[i].region}</p>
        </li>
        <li>
          <p>Subregion:${data[i].subregion}</p>
        </li>
        <li>
          <p>Poblacion:${data[i].population}</p>
        </li>
        <li>
          <p>Área:${data[i].area}</p>
        </li>
        <li>
        <h3>Lenguajes:</h3>
        <p id="${data[i].name}lenguaje"></p>
        </li>
        <li>
        <h3>Monedas:</h3>
        <p id="${data[i].name}moneda"></p>
        </li>
        </ul>
        <button id="${data[i].name}boton" class="boton">OK</button>
      </div>
    `;
    let languajes = '';
    let coin = '';
    listItem.innerHTML = content;
    for (let c = 0; c < data[i].languages.length; c += 1) {
      const languageContent = `
      ${data[i].languages[c].name}<br>
      `;
      languajes = languajes.concat(languageContent);
    }
    const countryLanguaje = document.getElementById(`${data[i].name}lenguaje`);
    countryLanguaje.innerHTML = languajes;
    for (let c = 0; c < data[i].currencies.length; c += 1) {
      const coinContent = `
        ${data[i].currencies[c].name}<br>
      `;
      coin = coin.concat(coinContent);
    }
    const countryCoin = document.getElementById(`${data[i].name}moneda`);
    countryCoin.innerHTML = coin;
    const nombrePais = document.getElementById(`${data[i].name}`);
    const modal = document.getElementById(`${data[i].name}modal`);
    modal.style.display = 'none';
    const boton = document.getElementById(`${data[i].name}boton`);
    nombrePais.addEventListener('click', () => {
      modal.style.display = 'block';
    });
    boton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }
}

const form = document.getElementById('form');
fetch('https://restcountries.eu/rest/v2/all')
  .then((response) => response.json())
  .then((data) => {
    addCountry(data);
    form.addEventListener('input', (event) => {
      event.preventDefault();
      const name = form.elements[0].value;
      const countryItem = data.filter((element) => element.name.toLowerCase().includes(`${name.toLowerCase()}`));
      if (!countryItem) {
        addCountry(data);
      } else {
        addCountry(countryItem);
      }
    });
  });

const capital = document.getElementById("capital");
const region = document.getElementById("region");
const population = document.getElementById("population");
const currencies = document.getElementById("currencies");
const languages = document.getElementById("languages");
const neighbors = document.querySelector(".neighbors");
const button = document.querySelector("button");
const img = document.querySelector('img')
const elementHidden = document.querySelector('.hidden')

async function fetchApi(paisInput) {
  try {
    const pais = "brazil";
    const url = `https://restcountries.com/v3.1/name/${paisInput}?fullText=true`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();

    const paisData = data[0];

    const capitalPais = paisData.capital[0];
    const paisNome = paisData.name.common;
    const todasLinguas = Object.values(paisData.languages).join(', ');
    const todasMoedas = Object.values(paisData.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ');
    const populacao = paisData.population;
    const paisesVizinhos = paisData.borders;
    const regiao = paisData.region
    const bandeira = paisData.flags.png

    console.log(capitalPais);
    console.log(bandeira);
    console.log(todasLinguas);
    console.log(populacao);
    console.log(regiao);
    console.log(paisesVizinhos);
    console.log(todasMoedas);

    capital.innerHTML = capitalPais
    region.innerHTML = regiao
    population.innerHTML = populacao
    currencies.innerHTML = todasMoedas
    languages.innerHTML = todasLinguas
    img.src = bandeira
    
    let lista = "<ul>";

    paisesVizinhos.forEach((pais) => {
      lista += `<li>${pais}</li>`;
    });

    lista += "</ul>";

    neighbors.innerHTML = lista;

    console.log(paisData);

  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}

document.getElementById("searchInput").addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const searchInput = document.getElementById("searchInput");
        const inputValue = searchInput.value;
        elementHidden.classList.remove('hidden');
        fetchApi(inputValue);
    }
});

button.addEventListener('click', () => {
    const searchInput = document.getElementById("searchInput");
    const inputValue = searchInput.value
    elementHidden.classList.remove('hidden')
    fetchApi(inputValue)
})


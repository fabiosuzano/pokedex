const pokeContent = document.getElementById('pokemonContent');
let pokeForm = document.getElementById('searchPokemon');
let typeForm = document.getElementById('typePokemon');
let orderForm = document.getElementById('orderPokemon');
let generationshow = 1
const modalSearch = document.getElementById('pokemonContent')
const divGeneration = document.getElementById('textGen')

const filterName = document.querySelector('#filter-name')
const filterType = document.querySelector('#filter-type')
const sortType = document.querySelector('#sort-type')


/*Exibir Gerações Pokemon*/ 
function showPokemonGen(gen){
    const pokemonGen = {
        1:[1, 151],
        2:[152, 251],
        3:[252, 386],
        4:[387, 493],
        5:[494, 649],
        6:[650, 721],
        7:[722, 809],
        8:[810, 898],
    };

    const pokemonGenDefault = [1, 151];
    const generacion = pokemonGen[gen] || pokemonGenDefault;
    return generacion;
    
}

let pokemonGeneration = showPokemonGen(generationshow)

/* Barra das gerações */ 

let arrowRight = document.getElementById('arrow-right').addEventListener('click', e=>{
   
    if (generationshow < 8){
        modalSearch.innerHTML = '';
       generationshow += 1
       pokemonGeneration = showPokemonGen(generationshow)
       divGeneration.innerHTML = 'Gen ' + generationshow
       drawPokemon()
   }
})


let arrowLeft = document.getElementById('arrow-left').addEventListener('click', e=>{
    
     if (generationshow > 1){
        modalSearch.innerHTML = '';
        generationshow -= 1
        pokemonGeneration = showPokemonGen(generationshow)
        divGeneration.innerHTML = 'Gen ' + generationshow
        drawPokemon()
        console.log(generationshow)
    }
 })


const drawPokemon = async () =>{
    for (let i = pokemonGeneration[0]; i <= pokemonGeneration[1]; i++) {
		await getPokemon(i);
	}
}

let getPokemon = async (id, modal, type) =>{
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let res = await fetch(url);
    const pokemon = await res.json();
    createPokemon(pokemon, modal, type);
}

/*pintar card pokemon*/
const colors = {
    fire: '#FFA05D',
	grass: '#8FD594',
	electric: '#FFE43B',
	water: '#7E97C0',
	ground: '#CAAC4D',
	rock: '#90642D',
	poison: '#9D5B9B',
	bug: '#EAFD71',
	dragon: '#97b3e6',
	psychic: '#FF96B5',
	flying: '#CDCDCD',
	fighting: '#FF5D5D',
	normal: '#FFFFFF',
    ghost: '#142679',
    fairy:'#F8B2C7',
    steel: '#8d8a8a',
    dark: '#5a4c4c',
    ice: '#77e8ec'
}

const main_types = Object.keys(colors)


function  createPokemon(pokemon, modal){
    const pokemonEl = document.createElement('div');
    console.log(pokemon);

	pokemonEl.classList.add('pokemon');
    
    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;
    
	const poke_types = pokemon.types.map((a)=> a.type.name);
	const type = main_types.find(types => poke_types.indexOf(types, types) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];

	pokemonEl.style.backgroundColor = color;

	

	if (modal !==true){
        const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type"><span>${pokemon.types.map((a)=> a.type.name).join(" / ")}</span></small>
        </div>
    `;
        pokemonEl.innerHTML = pokeInnerHTML;
        pokeContent.appendChild(pokemonEl);
    }

    else{
        const pokeInnerHTML = `
        <div class="modal" id="modalPokemon">
        <div class="pokemon">
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
							pokemon.id
						}.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
							.toString()
							.padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
        </div>
    
    </div>`;
    

    modalSearch.innerHTML = pokeInnerHTML;
        
    }
}

drawPokemon()


/*Buscar pokemon*/

pokeForm.addEventListener('submit', e =>{
    e.preventDefault();
    let searchPokemon = document.getElementById('pokemon').value;
    getPokemon(searchPokemon, true);
})

filterName.addEventListener('keyup', e => {
    loadFilters()
  })

filterType.addEventListener('change', e => {
    e.preventDefault()
    loadFilters()
    filterType.blur()
  })
  
sortType.addEventListener('change', e => {
    e.preventDefault()
    pokemon(pokedexValues, sortType.value)
    loadFilters()
    sortType.blur()
  })
  
function loadFilters() {
    warning.classList.remove('hidden')
    const name = filterName.value
    const type = filterType.value
    pokedexChilds.forEach(pokemon => {
      if (validPokemon(pokemon, name, type)) {
        pokemon.style.display = 'block'
        warning.classList.add('hidden')
      } else {
        pokemon.style.display = 'none'
      }
    })
  }

function sortPokedex(pokemon, sort) {
    switch(sort) {
      case 'ID Crescente':
        return pokemon.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0)
      case 'ID Decresente':
        return pokemon.sort((a, b) => a.id > b.id ? -1 : a.id < b.id ? 1 : 0)
      case 'A-Z':
        return pokemon.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
      case 'Z-A':
        return pokemon.sort((a, b) => a.name > b.name ? -1 : a.name < b.name ? 1 : 0)
    }
  }



function exitModal(){
   const modalPokemon = document.getElementById('modalPokemon');
   modalPokemon.style.display ='none';
   drawPokemon()
}



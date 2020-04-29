
const pokemons = new Map();
const difference = require('lodash/difference.js');
const userRepo = require('./userRepository.js');

let counter = 0;

function initWithSomePokemons() {
    pokemons.clear();

    createNewPokemon('this is a rare pokemon', 'Gold card','100', "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png");
    createNewPokemon('this is a pokemon', 'white card','90', "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png");
    createNewPokemon('this is a fire pokemon ', 'white card','80', "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png");
    createNewPokemon('this is a extremely rare fire pokemon', 'Gold card','1000', "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png");
    createNewPokemon('this is a fire pokemon', 'bronze card','55', "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png");
    createNewPokemon('this is a rare water pokemon', 'silver card','200', "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png");
    createNewPokemon('this is a water pokemon pokemon', 'silver','300', "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png");
    createNewPokemon('this is a n air pokemon', 'Gold card','40', "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png");

}

function createNewPokemon(description, title, value, image) {
    const id = '' + counter;
    counter++;

    const newPokemon = {
        id,
        description,
        title,
        image,
        value,
    };

    pokemons.set(id, newPokemon);

    return id;
}

function deletePokemionId(id) {
    return pokemons.delete(id);
}

function getPokemonsNotClaimedByTheUser(username) {
    const allPokemons = getAllPokemons();
    const unclaimed = [];
    const user = userRepo.getUser(username);

    const idsOfPokemons = allPokemons.map(pokemon => pokemon.id);

    const diff = difference(idsOfPokemons, user.claimed);

    diff.forEach(id => {
        const poke = getPokemon(id);
        unclaimed.push(poke);
    });

    return unclaimed;

}

function getPokemon(id) {
    return pokemons.get(id);
}

function getAllPokemons() {
    return Array.from(pokemons.values());
}


function updatePokemon(pokemon) {
    if (!pokemons.has(pokemon.id)) {
        return false;
    }
    pokemons.set(pokemon.id, pokemon);
    return true;
}

function getAllPokemonsSince(day) {
    return pokemons.values().filter((r) => r.day >= day);
}

function getClaimedPokemons(name) {
    const arr = userRepo.getClaimed(name);

    return arr.map(id => getPokemon(id));
}


module.exports = {
    initWithSomePokemons,
    getAllPokemons,
    getAllPokemonsSince,
    getPokemonsNotClaimedByTheUser,
    createNewPokemon,
    getClaimedPokemons,
    getPokemon,
    updatePokemon,
    deletePokemionId,
};

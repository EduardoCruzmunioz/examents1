import type { Pokemon } from "./interfaces/pokemon_interfaces";
import { getPokemons } from "./service";

let pokemons: Pokemon[] = [];
pokemons = await getPokemons();
let pokemonPesado: Pokemon = masPesado();
let pokemonLigero: Pokemon = masLigero();

function masPesado(): Pokemon {
  let pokemon: Pokemon = pokemons[0];

  for (let index = 1; index < pokemons.length; index++) {
    const element = pokemons[index];
    //console.log(element);

    if (pokemon.weight < element.weight) pokemon = element;
  }
  return pokemon;
}

function masLigero(): Pokemon {
  let pokemon: Pokemon = pokemons[0];
  for (let index = 1; index < pokemons.length; index++) {
    const element = pokemons[index];
    if (pokemon.weight > element.weight) pokemon = element;
  }
  return pokemon;
}
console.log(
  `Nombre: ${pokemonLigero.name} · Peso: ${pokemonLigero.weight} · Tipo: ${pokemonLigero.types[0].type.name}`,
);
console.log(
  `Nombre: ${pokemonPesado.name} · Peso: ${pokemonPesado.weight} · Tipo: ${pokemonPesado.types[0].type.name}`,
);

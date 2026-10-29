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

// Estilos en consola
console.log(
  `%c[MÁS LIGERO] ${pokemonLigero.name} - Peso: ${pokemonLigero.weight}`,
  "color: #1976d2; font-weight: bold;"
);
console.log(
  `%c[MÁS PESADO] ${pokemonPesado.name} - Peso: ${pokemonPesado.weight}`,
  "color: #d32f2f; font-weight: bold;"
);

// Pintar en el DOM
import("./style.css");

const app = document.getElementById("app");
if (app) {
  app.innerHTML = `
    <h1>Examen TypeScript - Pokemon</h1>
    <div class="contenedor">
      <div class="tarjeta ligero">
        <h2>Más ligero</h2>
        <img src="${pokemonLigero.sprites.front_default}" alt="${pokemonLigero.name}">
        <p><strong>Nombre:</strong> ${pokemonLigero.name}</p>
        <p><strong>Peso:</strong> ${pokemonLigero.weight}</p>
        <p><strong>Tipo:</strong> ${pokemonLigero.types[0].type.name}</p>
      </div>

      <div class="tarjeta pesado">
        <h2>Más pesado</h2>
        <img src="${pokemonPesado.sprites.front_default}" alt="${pokemonPesado.name}">
        <p><strong>Nombre:</strong> ${pokemonPesado.name}</p>
        <p><strong>Peso:</strong> ${pokemonPesado.weight}</p>
        <p><strong>Tipo:</strong> ${pokemonPesado.types[0].type.name}</p>
      </div>
    </div>
  `;
}

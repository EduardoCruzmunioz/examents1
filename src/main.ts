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
  let htmlPokemons = "";
  for (let i = 0; i < pokemons.length; i++) {
    const p = pokemons[i];
    htmlPokemons += `
      <div class="tarjeta-mini">
        <img src="${p.sprites.front_default}" alt="${p.name}">
        <p class="nombre">${p.name}</p>
        <p>Peso: ${p.weight}</p>
        <p>Tipo: ${p.types[0].type.name}</p>
      </div>
    `;
  }

  app.innerHTML = `
    <h1>Listado de Pokemons</h1>
    <div class="listado">
      ${htmlPokemons}
    </div>

    <h2>Destacados por peso</h2>
    <div class="contenedor-destacados">
      <div class="tarjeta ligero">
        <h3>Más ligero</h3>
        <img src="${pokemonLigero.sprites.front_default}" alt="${pokemonLigero.name}">
        <p><strong>Nombre:</strong> ${pokemonLigero.name}</p>
        <p><strong>Peso:</strong> ${pokemonLigero.weight}</p>
        <p><strong>Tipo:</strong> ${pokemonLigero.types[0].type.name}</p>
      </div>

      <div class="tarjeta pesado">
        <h3>Más pesado</h3>
        <img src="${pokemonPesado.sprites.front_default}" alt="${pokemonPesado.name}">
        <p><strong>Nombre:</strong> ${pokemonPesado.name}</p>
        <p><strong>Peso:</strong> ${pokemonPesado.weight}</p>
        <p><strong>Tipo:</strong> ${pokemonPesado.types[0].type.name}</p>
      </div>
    </div>
  `;
}

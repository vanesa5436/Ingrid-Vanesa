import './style.css';
import { getPokemonList, getPokemonDetails } from "./services/pokemon.sevicios";

const app = document.querySelector<HTMLDivElement>('#app')!;

const descubiertos = new Set<number>();
let listaCompleta: { name: string; url: string }[] = [];
const sacarId = (url: string): number => {
    const partes = url.split("/").filter(Boolean);
    return parseInt(partes[partes.length - 1], 10);};

const cardSinDescubrir = (name: string, id: number): string => `
    <div class="card no-descubierto" data-id="${id}">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="???"
        /> <h3>#${String(id).padStart(3, "0")} - ???</h3>   <p class="estado">No descubierto</p> </div>`;

const cardDescubierto = (id: number, name: string, imagen: string): string => `<div class="card descubierto" data-id="${id}">
        <img src="${imagen}" alt="${name}" /> <h3>#${String(id).padStart(3, "0")} - ${name.toUpperCase()}</h3><p class="estado">¡Descubierto!</p>
    </div>
`;

const mostrarLista = (lista: { name: string; url: string }[]) => {
    const encabezado = `
        <h1>Pokérex de Vane </h1> <div class="buscador"> <input type="text" id="input-buscar" placeholder="¿Qué pokémon buscas?" />  <button id="btn-buscar">Buscar</button> </div>
        <p id="contador"> Descubiertos: ${descubiertos.size} / ${listaCompleta.length}</p>`;

  
    const tarjetas = lista
        .map(({ name, url }) => {
            const id = sacarId(url);

            if (descubiertos.has(id)) {
                const imagen = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`; return cardDescubierto(id, name, imagen);
            } else {
                return cardSinDescubrir(name, id);
            }}).join("");

    app.innerHTML = encabezado + `<div id="grilla">${tarjetas}</div>`;  document.querySelector<HTMLButtonElement>("#btn-buscar")! .addEventListener("click", buscarPokemon);

    document.querySelector<HTMLInputElement>("#input-buscar")!.addEventListener("keydown", (e) => {
            if (e.key === "Enter") buscarPokemon();});};

const buscarPokemon = async () => { const input  = document.querySelector<HTMLInputElement>("#input-buscar");
    if (!input) return; const busqueda = input.value.trim().toLowerCase();
    if (!busqueda) { mostrarLista(listaCompleta);
        return;}

    const encontrados = listaCompleta.filter(({ name }) => name.toLowerCase().includes(busqueda)
    ); for (const { url } of encontrados) {   const id = sacarId(url);

        if (!descubiertos.has(id)) {
            try {
                const { id: idReal, name, sprites } = await getPokemonDetails(id); const { front_default: imagen } = sprites;

                descubiertos.add(idReal); console.log(`¡Encontraste a ${name}! imagen: ${imagen}`);

            } catch (error) { console.error("este pokemon se escapo:", error); }}

    } mostrarLista(encontrados.length > 0 ? encontrados : listaCompleta);
    const contador = document.querySelector<HTMLParagraphElement>("#contador");
    if (contador) {
        contador.textContent = ` Descubiertos: ${descubiertos.size} / ${listaCompleta.length}`;}};


        
const loadPokemon = async () => {
    try {
        app.innerHTML = "<h2>Buscando pokemon salvaje...</h2>";   const { results } = await getPokemonList(); listaCompleta = results;

        console.log("¡Mira lo que hemos encontrado!", results);   mostrarLista(listaCompleta);  } 
        
        catch (error) {
        console.error("¡Oh no! los pokemon escaparon", error); app.innerHTML = "<h2>Intenta recargar la página.</h2>";
    }};loadPokemon();
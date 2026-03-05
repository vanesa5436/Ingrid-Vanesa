import { pokeAPI } from "../api/pokeAPI";
import type { PokemonListResponse, Pokemon } from "../interfaces/pokeAPI.interface";


export const getPokemonList = async (): Promise<PokemonListResponse> => { const { data } = await pokeAPI.get("/pokemon?limit=151");
    return data;};


export const getPokemonDetails = async (id: number): Promise<Pokemon> => { const { data } = await pokeAPI.get(`/pokemon/${id}`);
    return data;};
import axios, { AxiosResponse } from "axios";

import { PokemonResponse } from "@/interfaces";



const pokemonApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});


const getPokemonsList = () => {
  return pokemonApi.get<PokemonResponse>('/pokemon/?limit=30');
}

export default pokemonApi;
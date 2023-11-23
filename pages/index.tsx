
import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Input, Pagination } from "@nextui-org/react";

import { Layout } from '../components/layouts/Layout';
import { PokemonCard } from "@/components/pokemon/PokemonCard";

import { Pokemon, PokemonResponse, SmallPokemon } from "@/interfaces";
import { pokemonApi } from "@/api";
import { getIdNumberFromUrl } from "@/helpers";


const HomePage: NextPage = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pokemonsData, setPokemonsData] = useState<SmallPokemon[]>([]);
  const [pokemonResponse, setPokemonResponse] = useState<PokemonResponse>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [wordToSearch, setWordToSearch] = useState<string>('');
  const [searchData, setSearchData] = useState<SmallPokemon[]>([]);

  useEffect(() => {
    getPokemonsList();
    // setPokemonsTotal( ( currentTotal ) => ( currentTotal + 30 ));
  }, []);

  const getPokemonsList = async ( offset: number = 0 ) => {
    setIsLoading( true );
    const url: string = offset ? `/pokemon?limit=30&offset=${offset}` : '/pokemon?limit=30';
    const { data } = await pokemonApi.get<PokemonResponse>(url);
    setPokemonResponse( { ...data, results: [] } );
    setNewPokemons( data.results );
    setIsLoading( false );
  }
  
  const setNewPokemons = ( data: SmallPokemon[] ): void => {    
    const pokemons: SmallPokemon[] = data.map( ( pokemon ) => {;
      const pokemonId = getIdNumberFromUrl( pokemon.url )
      return {
        ...pokemon,
        id: pokemonId,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemonId }.svg`
      }
    });
    setPokemonsData( pokemons );
  }

  const onChangePage = ( pageNumber: number ): void => {
    const offset = (pageNumber * 30) - 30;
    getPokemonsList( offset );
    setCurrentPage( pageNumber );
  }

  const onSearchPokemon = async ( term: string ) => {
    setWordToSearch(term)
    if ( term.length >= 3 ) {
      if ( searchData.length === 0 ) {
        setIsLoading( true );
        const { data } = await pokemonApi.get<PokemonResponse>('/pokemon?limit=10000');
        setSearchData( data.results );
        setIsLoading( false );
      }
      const pokemonsSearched = searchData.filter( pokemon => pokemon.name.includes( term ) );
      setNewPokemons( pokemonsSearched);
    }
    if ( term.length === 0 ) {
      getPokemonsList();
      setSearchData([]);
    }
  }

  if ( isLoading ) return (
    <Layout title="Inicio">
      <div className="flex justify-center items-center h-screen">
        <p>Cargando...</p>
      </div>
    </Layout>
  )

  return (
    <>
      <Layout title="Inicio">
        <div className="flex flex-col items-center py-6 h-full">
          <Input type="text" 
                 label="Buscar" 
                 placeholder="Nombre de Pokemon" 
                 className="w-1/3"
                 name="valueSearch"
                 value={wordToSearch}
                 onValueChange={onSearchPokemon}
                 autoFocus/>
          <div className="flex flex-row flex-wrap justify-center gap-3 py-6 px-4">
            {
              pokemonsData.length === 0
                ? (
                  <div className="h-screen">
                    <h2>No se encontró el Pokemon</h2>
                  </div>
                )
                : (
                  pokemonsData.map( pokemon => (
                    <PokemonCard key={pokemon.id} pokemon={ pokemon }/>
                  ))
                )
            }
          </div>
          {
            (pokemonResponse?.count && wordToSearch.length === 0) && (
              <Pagination total={Math.ceil(pokemonResponse.count / 30)} 
                          initialPage={currentPage} 
                          showControls 
                          showShadow 
                          siblings={2}
                          onChange={(pageNumber) => onChangePage( pageNumber )}/>
            )
          }
        </div>
      </Layout>
    </>
  )
}

export default HomePage;

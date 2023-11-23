
import React, { useEffect } from "react";
import { NextPage } from "next";
import { Input, Pagination } from "@nextui-org/react";

import { Layout } from '../components/layouts/Layout';
import { PokemonCard } from "@/components/pokemon/PokemonCard";

import { PokemonResponse, SmallPokemon } from "@/interfaces";
import { pokemonApi } from "@/api";
import { getIdNumberFromUrl } from "@/helpers";


const HomePage: NextPage = () => {

  // const [pokemonsTotal, setPokemonsTotal] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [pokemonsData, setPokemonsData] = React.useState<SmallPokemon[]>([]);
  const [pokemonResponse, setPokemonResponse] = React.useState<PokemonResponse>();
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [wordToSearch, setWordToSearch] = React.useState<string>('');

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
      setIsLoading( true );
      const { data } = await pokemonApi.get<PokemonResponse>('/pokemon?limit=10000');
      const allPokemons: SmallPokemon[] = data.results;
      const pokemonsSearched = allPokemons.filter( pokemon => pokemon.name.includes( term ) );
      setNewPokemons( pokemonsSearched);
      setIsLoading( false );
    }
    if ( term.length === 0 ) {
      getPokemonsList();
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
        <div className="flex flex-col items-center py-6">
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
              pokemonsData.map( pokemon => (
                <PokemonCard key={pokemon.id} pokemon={ pokemon }/>
              ))
            }
          </div>
          {
            (pokemonResponse?.count && wordToSearch.length < 3) && (
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


// export async function getServerSideProps() {
//   const { data } = await pokemonApi.get<PokemonResponse>('/pokemon?limit=30');
//   const pokemons: SmallPokemon[] = data.results.map( (pokemon, id) => ({
//     ...pokemon,
//     id: id + 1,
//     img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ id + 1 }.svg`
//   }));
 
//   return { props: { pokemons } }
// }

export default HomePage;

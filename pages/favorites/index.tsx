import { useEffect, useState } from "react";
import { NextPage } from "next";
import { Card, CardBody } from "@nextui-org/react";

import { Layout } from "@/components/layouts";
import { PokemonCard } from "@/components/pokemon/PokemonCard";

import { Pokemon, SmallPokemon } from "@/interfaces";
import { getFavoritesPokemons } from '../../helpers/favorite-pokemons';
import { pokemonApi } from "@/api";


const FavoritesPage: NextPage = () => {

  const [favoritesPokes, setFavoritesPokes] = useState<SmallPokemon[]>([]);

  useEffect(() => {
    getFavoritesPokesData();
  }, []);
  
  const getFavoritesPokesData = async (): Promise<void> => {
    const favorites: number[] = getFavoritesPokemons();
    const pokemonPromises: Promise<SmallPokemon>[] = favorites.map( async (id) => {
      const { data } = await pokemonApi.get<Pokemon>(`/pokemon/${id}`);
      return {
          id: data.id,
          name: data.name,
          url: '',
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ data.id }.svg`
        };
      });
    const favoritesData: SmallPokemon[] = await Promise.all(pokemonPromises);
    setFavoritesPokes( favoritesData);
    return;
  }
  
  return (
    <Layout>
      <div className="flex flex-col h-screen p-4">
        <h2 className="font-bold text-5xl">Favoritos</h2>
        <div className="flex flex-row flex-wrap justify-center gap-3 py-6">
          {
            favoritesPokes.length === 0
              ? (
                <Card>
                  <CardBody>
                    <h3>No existe ningún Favorito</h3>
                  </CardBody>
                </Card>
              )
              : (
                favoritesPokes.map( pokemon => (
                  <PokemonCard key={pokemon.id} pokemon={ pokemon }/>
                ))
              )
          }
        </div>
      </div>
    </Layout>
  )
}

export default FavoritesPage;

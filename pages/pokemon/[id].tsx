import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {Card, CardHeader, CardBody, CardFooter, Button} from "@nextui-org/react";

import { Layout } from "@/components/layouts";
import { PokemonCardBody } from "@/components/pokemon/PokemonCardBody";
import { FavoriteIcon } from "@/components/ui/FavoriteIcon";

import { Pokemon, SmallPokemon } from "@/interfaces";
import { pokemonApi } from "@/api";


const PokemonPage: NextPage = () => {

  const { query } = useRouter();
  const [pokemon, setPokemon] = React.useState<Pokemon>();

  useEffect(() => {
    getPokemonById();
  }, []);
  

  const getPokemonById = async () => {
    const { id } = query;
    const { data } = await pokemonApi.get<Pokemon>(`/pokemon/${ id }`);
    setPokemon( data );
  }

  const onAddToFavorites = ( pokemon: SmallPokemon ) => {
    console.log( pokemon );
    
  }
  
  if ( !pokemon ) return (
    <Layout title="Información de Pokemon">
      <div className="flex flex-row justify-center items-center py-6">
        <Card className="max-w-[600px]">
          <CardBody className="flex flex-row justify-center gap-4">
            <h5 className="text-center">No se pudo encontrar el Pokemon</h5>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );

  return (
    <Layout title="Información de Pokemon">
      <div className="flex flex-row justify-center items-center py-6">
        <Card className="w-1/2">
          <CardHeader className="flex justify-center">
              <h2 className="font-bold text-2xl text-center pb-2">{pokemon.name.toUpperCase()}</h2>
          </CardHeader>
          
          <PokemonCardBody pokemon={pokemon} />

          <CardFooter className="flex justify-center">
            <Button isIconOnly 
                    color="danger" 
                    aria-label="Like" 
                    onClick={() => onAddToFavorites({
                      id: pokemon.id,
                      name: pokemon.name,
                      img: pokemon.sprites.other?.dream_world.front_default || '',
                      url: ''
                    })} >
              <FavoriteIcon />
            </Button>  
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}
 
// export const getServerSideProps = (async ({ params }) => {
//   console.log(params);
  
//   const { id } = params as { id: string };
//   
   
//   return { props: { data } }
// }) satisfies GetServerSideProps<{
//   data: Pokemon
// }>

export default PokemonPage;

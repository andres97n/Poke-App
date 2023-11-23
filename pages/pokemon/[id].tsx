import { useEffect,useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {Card, CardHeader, CardBody, CardFooter, Button, CircularProgress} from "@nextui-org/react";

import { Layout } from "@/components/layouts";
import { PokemonCardBody } from "@/components/pokemon/PokemonCardBody";
import { FavoriteIcon } from "@/components/ui/FavoriteIcon";

import { Pokemon } from "@/interfaces";
import { pokemonApi } from "@/api";
import { capitalizeFirstLetter, changeFavorites, existInFavorites } from "@/helpers";


const PokemonPage: NextPage = () => {

  const { query } = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [isInFavorites, setIsInFavorites] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getPokemonById();
  }, []);

  useEffect(() => {
    if ( pokemon ) {
      if ( existInFavorites( pokemon.id ) ){
        setIsInFavorites( true );
      }
    }
  }, [pokemon]);

  const getPokemonById = async () => {
    setIsLoading( true );
    const { id } = query;
    const { data } = await pokemonApi.get<Pokemon>(`/pokemon/${ id }`);
    setPokemon( data );
    setIsLoading( false );
  }

  const onChangeFavorites = () => {
    changeFavorites( pokemon!.id );
    setIsInFavorites( !isInFavorites );
  }
  
  if ( !pokemon ) return (
    <Layout title="Pokemon">
      <div className="flex flex-row justify-center items-center py-6 h-screen">
        <Card className="max-w-[600px]">
          <CardBody className="flex flex-row justify-center gap-4">
            <h5 className="text-center">No se pudo encontrar el Pokemon</h5>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );

  return (
    <Layout title={ capitalizeFirstLetter(pokemon.name) }>
      <div className="flex flex-row justify-center items-center py-6 h-screen">
        {
          isLoading
            ? (
              <CircularProgress aria-label="Loading..." />
            )
            : (
              <Card className="w-1/2">
                <CardHeader className="flex justify-center">
                    <h2 className="font-bold text-3xl text-center pb-2">{pokemon.name.toUpperCase()}</h2>
                </CardHeader>
                
                <PokemonCardBody pokemon={pokemon} />

                <CardFooter className="flex justify-center">
                  <Button isIconOnly 
                          color="danger" 
                          aria-label="Like"
                          variant={ isInFavorites ? "solid" : "ghost" }
                          onClick={onChangeFavorites} >
                    <FavoriteIcon />
                  </Button>  
                </CardFooter>
              </Card>
            )
        }
      </div>
    </Layout>
  )
}
 
export default PokemonPage;

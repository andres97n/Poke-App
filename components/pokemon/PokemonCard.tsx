import { FC } from "react"
import { useRouter } from "next/router";
import {Card, CardHeader, CardBody, Image, CardFooter } from "@nextui-org/react";

import { SmallPokemon } from "@/interfaces";
import { capitalizeFirstLetter } from "@/helpers";
import NoImage from '../../public/no_image.svg';

type Props = {
  pokemon: SmallPokemon
}


export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();

  const onPressPokemon = () => {
    router.push(`/pokemon/${ pokemon.id }`)
  }

  return (
    <Card className="py-4" isPressable onPress={onPressPokemon}>
      <CardHeader className="pb-0 pt-2 px-4 flex-row justify-between">
        <h3 className="font-bold text-large">{ capitalizeFirstLetter( pokemon.name ) }</h3>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {
          pokemon.img
            ? (
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={pokemon.img}
                width={225}
              />
            )
            : (
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={ NoImage }
                width={225}
              />
            )
        }
      </CardBody>
      <CardFooter>
          <h6>{`#${pokemon.id}`}</h6>
      </CardFooter>
    </Card>
  )
}

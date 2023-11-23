import { FC } from "react"
import { CardBody, Image, Chip, Divider } from "@nextui-org/react";

import { Pokemon } from "@/interfaces"
import NoImage from '../../public/no_image.svg';


type Props = {
  pokemon: Pokemon
}


export const PokemonCardBody: FC<Props> = ({ pokemon }) => {
  return (
    <CardBody className="grid grid-cols-3 gap-2">
      <div className="flex flex-col justify-center">
        {
          pokemon.sprites.other?.dream_world.front_default
            ? (
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={ pokemon.sprites.other.dream_world.front_default }
                width={225} />
            )
            : (
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={ NoImage }
                width={225} />
            )
        }
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col items-center py-2">
          <h4 className="pb-3">Tipos</h4>
          <div className="flex flex-row flex-wrap gap-2">
            {
              pokemon.types.map( ( type, index ) => (
                <Chip key={index} color="primary">{type.type.name}</Chip>
              ))
            }
          </div>
        </div>
        <Divider className="my-4" />
        <div className="flex flex-col items-center">
          <h4 className="pb-3">Estadísticas</h4>
          <div className="flex flex-row flex-wrap justify-center gap-2">
            {
              pokemon.stats.map( ( stat, index ) => (
                <Chip key={index} color="secondary">{stat.stat.name} - {stat.base_stat}</Chip>
                ))
              }
          </div>
        </div>
      </div>
      
      <div className="flex flex-col">
        <div className="flex flex-col items-center py-2">
          <h4 className="pb-3">Hablidades</h4>
          <div className="flex flex-row flex-wrap gap-2">
            {
              pokemon.abilities.map( ( ability, index ) => (
                <Chip key={index} color="success">{ability.ability.name}</Chip>
              ))
            }
          </div>
        </div>
        <Divider className="my-4" />
        <div className="flex flex-col items-center">
          <h4 className="pb-3">Transformaciones</h4>
          <div className="flex flex-row flex-wrap justify-center gap-2">
            {
              pokemon.forms.map( ( form, index ) => (
                <Chip key={index} color="secondary">{form.name.toUpperCase()}</Chip>
                ))
              }
          </div>
        </div>
      </div>   
    </CardBody>
  )
}

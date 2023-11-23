

export const capitalizeFirstLetter = ( word: string ): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const getIdNumberFromUrl = ( path: string ): number => {
  
  return parseInt(path.replace('https://pokeapi.co/api/v2/pokemon/', ''). replace('/', ''));
}
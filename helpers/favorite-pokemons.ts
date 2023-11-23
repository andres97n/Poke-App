

export const changeFavorites = ( id: number ): void => {
  let favorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');

  if( favorites.includes(id) ) {
    favorites = favorites.filter( pokeId => pokeId !== id );
  } else {
    favorites.push(id);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export const existInFavorites = ( id: number ): boolean => {

  if ( typeof window === 'undefined' ) return false;
  
  const favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );

  return favorites.includes( id );
}

export const getFavoritesPokemons = (): number[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]') as number[];
}
import { Pokemon } from './types';
import '../App.css';

interface PokemonProps {
    pokemon: Pokemon;
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatPokemonId = (id: number) => {
  return id < 10 ? `00${id}` : id < 100 ? `0${id}` : `${id}`;
};

const Card: React.FC<PokemonProps>= ({pokemon}) => {
  return (
    <div className='pokemon-card'>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <div className='pokemon-stats'>
          <p>#{formatPokemonId(pokemon.id)}</p>
          <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
        </div>
    </div>
  )
};

export default Card;
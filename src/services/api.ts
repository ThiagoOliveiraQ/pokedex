import axios from 'axios';
import { Pokemon } from '../components/types';

const API_URL = 'https://pokeapi.co/api/v2/';

export const getPokemon = async (name: string) : Promise<Pokemon> =>{
    const response = await axios.get(`${API_URL}pokemon/${name}`);
    const data = response.data;

    const pokemon: Pokemon = {
        id: data.id,
        name: data.name,
        sprites: {
            front_default: data.sprites.front_default
        },
    }
    return pokemon;
}
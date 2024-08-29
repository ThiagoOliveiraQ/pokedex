import { useState, useEffect } from "react";
import { Pokemon } from "./types";
import {getPokemon} from "../services/api";
import Cards from "./cards";
import Logo from "../assets/logo.png";
import '../App.css';

const Pokedex: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [search, setSearch] = useState<string>('');

    const fetchData = async (name:string) => {
      try {
          const pokemon = await getPokemon(name);
            setPokemons((prev) => {
              if (prev.find(p => p.id === pokemon.id)) {
                return prev;
              }
              const updatedPokemons = [...prev, pokemon];
              return updatedPokemons;
            });
          } catch (error) {
            console.error('Pokemon not found:', error);
          }
        };

    useEffect(() => {
        const storedPokemons = localStorage.getItem('pokemons');
        if (storedPokemons) {
          setPokemons(JSON.parse(storedPokemons));
        }
      }, []);

    useEffect(() => {
        if(pokemons.length >0) {
        localStorage.setItem('pokemons', JSON.stringify(pokemons));
}}, [pokemons]);

    const handleSearch = () => {
        fetchData(search.toLowerCase());
        setSearch('');

    };

    return (
        <div className='container'>
          <div className="header">
            <img src={Logo} alt="Pokemon" className='image'/>
              <div className="search-bar">
                <input type="text" placeholder="Pesquisar" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <button onClick={handleSearch}>Buscar</button>
                <p>Busque com o nome ou o ID do Pokemon</p>
              </div>
          </div>
            <div className="pokedex-grid">{pokemons.map((pokemon)=> (
                <Cards key={pokemon.id} pokemon={pokemon}/>
            ))}
            </div>
        </div>
    )
};

export default Pokedex;
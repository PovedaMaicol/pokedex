import React from 'react'
import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/pokeCard.css'


const PokeCard = ({url}) => {

    const [pokemon, getPokemon] = useFetch();
    const navigate = useNavigate();

    useEffect(() => {
      getPokemon(url);
    }, []);
    

    // console.log(pokemon);
    const handleClick = () => {   
      navigate(`/pokedex/${pokemon.id}`);
    }

    // console.log(pokemon);



  return (
    <article onClick={handleClick} className={`poke_card card${pokemon?.types[0].type.name}`}>
      <div className={pokemon?.types[0].type.name}></div>
      <figure>
        <img className='poke_img' width='100%'src={pokemon?.sprites.other['official-artwork'].front_default} alt='pokemon photo' />
      </figure>
        <h2 className={`name${pokemon?.types[0].type.name}`}>{pokemon?.name}</h2>
        <ul className='poke_types'>
          {
            pokemon?.types.map(type => (
              <li key={type.type.url} className={`slot${type.slot}`}>
                <h4 className='poke_type'>{type.type.name}</h4>
                </li>
            ))
          }
        </ul>
        <p className='poke_p'>Type</p>
        <hr />
        <ul className='poke_stats'>
          {
            pokemon?.stats.map(stat => (
              !stat.stat.name.includes('special') &&
              <li key={stat.stat.url} className='poke_li'>{stat.stat.name} <span style={{ fontSize: 'large'}}  className={`span${pokemon?.types[0].type.name}`} >{stat.base_stat}</span></li>
            ))
          }
        </ul>
    </article>
  )
}

export default PokeCard
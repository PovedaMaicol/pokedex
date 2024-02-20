import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/pokeIdPage.css'
import Header from '../components/Header';



const PokeIdPage = () => {


  const [ pokeData, getPokeData ] = useFetch();
  const param =  useParams();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/pokedex/`)
  }

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${param.id}`;
    getPokeData(url);
  }, []);

  console.log(pokeData);

  

  return (
<>
<Header/>
<div className='card_id_container'>
    <article className={`id_card card${pokeData?.types[0].type.name}`}>
    <div className={pokeData?.types[0].type.name}></div>
      <figure>
      <i class='bx bx-x-circle' onClick={handleClick}></i>
      <img src={pokeData?.sprites.other['official-artwork'].front_default} alt='pokemon photo' />
      </figure>
      
    <h3 className='poke_number'>#{pokeData?.id}</h3>
    <h2 className={`name${pokeData?.types[0].type.name}`}>{pokeData?.name}</h2>
    

    
    
    <ul className='id_card_measures'>
      <li className='measures_li'>weight <br/><span>{pokeData?.weight}</span></li>
      <li className='measures_li'>height <br/><span>{pokeData?.height}</span></li>
    </ul>


   
<section className='hability_types'>

    <section className='types'>
      <h3>Types</h3>
      <ul className='types_ul'>
  {
    pokeData?.types.map(type => (
      <li className={`type_li type${type?.type.name}`}>{type?.type.name}</li>
    ))
  }

 </ul>   
 <br/> 
</section>
    
    <section className='habilities'>
      <h3>Habilities</h3>
      <ul className='habilities_ul'>
        {
          pokeData?.abilities.map(ability => (

            <li className='habiliti_li'>{ability?.ability.name}</li>

          ))
        }
  
     
      </ul>
   
      </section>
      
  
      </section>


<section className='stats'>
  <h3>Stats<span><hr/></span></h3>
   
          {
            pokeData?.stats.map(stat => (
              !stat.stat.name.includes('special') &&
             
  <ul className='stats_ul'>
    <section className='stats_subtitle'>
    <h5 className='stat_name'>{stat.stat.name}</h5>
    <h5 className='stat_name'>{stat?.base_stat}/150</h5>
    </section>
    
              <li className='stat_li_container'>
                <li key={stat.stat.url} className={`poke_stat_li ${pokeData?.types[0].type.name}`} style={{width: `${stat?.base_stat}%`}}></li>
              </li>
              </ul>
            ))  
          }
        
      </section>
<hr/>
    
    
   



    </article>
    </div>
    </>
  )
}


export default PokeIdPage;
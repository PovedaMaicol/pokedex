import React, { useRef, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPokemonName } from '../store/slices/pokemonName';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/pokedexPage/PokeCard';
import SelectType from '../components/pokedexPage/SelectType';
import './styles/pokedexPage.css';
import Header from '../components/Header';
import Pagination from '../components/Pagination';


const PokedexPage = () => {

    const [selectValue, setSelectValue] = useState('allPokemons');
    const trainerName = useSelector(store => store.trainerName);
    const pokemonName = useSelector(store => store.pokemonName);
    const dispatch = useDispatch();
    const [pokemons, getPokemons, getPerType] = useFetch();

    // este es el estado que almacena cada pagina - paginado
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        if (selectValue==='allPokemons') {
            const url =  'https://pokeapi.co/api/v2/pokemon/?limit=30';
            getPokemons(url);
        } else {
            getPerType(selectValue);
        }
    }, [selectValue]);
    
   
    const textInput =  useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setPokemonName(textInput.current.value.trim().toLowerCase()));
        textInput.current.value = '';
    }

    // console.log(pokemons);

    const cbFilter = () => {
        if (pokemonName) {
          
            return residentParts.filter(element => element.name.includes(pokemonName));
        } else {
          
            return residentParts;
            
          
            // return pokemons?.results;
        }
    }

    // console.log(selectValue);

    // aqui voy a empezar el paginado 
 
    const quantity = 5;
    const second = currentPage * quantity;
    const first = second - quantity;
    const totalPages = pokemons && Math.floor(pokemons.results.length / quantity);
    const residentParts = pokemons && pokemons.results.slice(first, second)

  return (
    
    <div className='pokedex'>
        <Header/>
        <section className='poke_header'>
        <h3 className='poke_subtitle'><span className='poke_span'>Bienvenido {trainerName} <br/> </span>aqui podras encontrar tu pokemon favorito</h3>
        <div className='poke_container_form'>
        <form onSubmit={handleSubmit} className='poke_form'>
            <input type='text' ref={textInput} className='poke_input'/>
            <button className='poke_btn'>Buscar</button>
        </form>
        <SelectType
        setSelectValue={setSelectValue}
        />

        </div>
       
        </section>
        <section className='poke_container'>
            {
                cbFilter()?.map(poke => (
                    <PokeCard 
                    key={poke.url}
                    url={poke.url}
                    />

                ))
            }

        </section>
        <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        />
   </div>
  )
}

export default PokedexPage
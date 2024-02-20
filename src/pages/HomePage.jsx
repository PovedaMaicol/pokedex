import React, { useRef } from 'react'
import { setTrainerName } from '../store/slices/trainerName.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './styles/homePage.css'

const HomePage = () => {
    const dispatch = useDispatch();
    const trainerName = useSelector((store) => store.trainerName);

    const navigate = useNavigate();

    const textInput = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setTrainerName(textInput.current.value.trim()));
        navigate('/pokedex');
    }

  
  return (
    <div className='home_background'>

      <div className='home_container'>
      <div className='container_img_home'>
        <img src='/img/log1.1.png' width='100%'></img>
      </div>
      <br/>
        <h1 className='home_titular'>¡Hola entrenador!</h1>
        <h2 className='home_subtitle'>Para poder comenzar, dame tu nombre</h2>
        <br/>
        <form onSubmit={handleSubmit} className='home_form'>
            <input type='text' ref={textInput} className='home_input'/>
            <button className='home_btn'>Comenzar</button>
        </form>
       
        </div>
    </div>
  )
}

export default HomePage
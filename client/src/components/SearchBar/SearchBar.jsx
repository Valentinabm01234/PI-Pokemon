import React from 'react';
import { useState,  } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../../actions';
import '../SearchBar/SearchBar.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const cambiarEstado = () => {
        setLoading(true);
        setTimeout(() =>{
            setLoading(false)
        }, 3000)
    }

    

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!name){
            return('no se encontró')
        }
        dispatch(getNamePokemons(name))
    }

    console.log('NAME: ', name)

    return(
        <div className='search-div'>
            <input className='input-buscar' type = 'text' placeholder = 'search...' onChange={(e) => handleInputChange(e)} />
            <button className='buscar' type = 'submit' onClick={(e) => { handleSubmit(e); cambiarEstado()}}>GO</button>
            {loading && <img className='buscar-gif' src='https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif' alt=''></img> }
            
                

        </div>
    )
}




  
  
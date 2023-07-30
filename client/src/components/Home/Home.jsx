import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterCreated, orderByName, filterType, getTypes, orderByAttack} from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import PikachuGif from '../../Imagenes/PikachuGif.gif'
import PokeballWhiteSpinner from '../../Imagenes/PokeballWhiteSpinner.gif'

import './Home.css';

export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector ((state) => state.pokemons); 
    const types = useSelector((state) => state.types);         
    const [loading, setLoading] = useState(false);

    const cambiarEstado = () => {
        setLoading(true);
        setTimeout(() =>{
            setLoading(false)
        }, 3000)
    }

    //PAGINADO.
    const [currentPage, setCurrentPage] = useState(1);                      
    const [pokemonsPerPage, /*setPokemonsPerPage*/] = useState(12);             
    const [/*orden*/, setOrden] = useState("");
    const indexOfLastPokemon = currentPage * pokemonsPerPage            
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage 
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon) 

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)      
    }


    useEffect (() =>{                       
        if(!allPokemons[0]){             
            dispatch(getPokemons());       
            dispatch(getTypes());              
         }
    }, [dispatch, allPokemons]);

    function handleClick(e){            
        e.preventDefault();             
        dispatch(getPokemons())         
    };

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))    
    }

    function handleFilterType(e){
        dispatch(filterType(e.target.value))   
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));  
        setCurrentPage(1);                      
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleAttackSort(e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)

    }

    return (                                            
        <div className='prueba'>
            <div className='white'>
              <div className='first-navbar'>  
                <h1 className='titulo'>POKEMON WEB</h1>
                <div className='titulo-resp'>
                    <h1 className='titulo'>POKEMON</h1>
                    <h1 className='titulo'>WEB</h1>
                </div>
                <Link to='/pokemon'><button className='crear'>CREATE</button></Link>
              </div>  
                <SearchBar/>                         

            </div>
            <div>
                
            </div>
            <div>
              <div className='filt-bar'>     
                <select className='filter' value='default' onChange={e => handleSort(e)}>
                    <option value='default' disabled hidden>NAME</option>
                    <option value='asc'>A → Z</option>
                    <option value='Desc'>Z → A</option>
                </select>
                <select className='filter' value='default' onChange={e => handleAttackSort(e)}>
                    <option value='default' disabled hidden>ATTACK</option>
                    <option value='max'>+ ATTACK</option>
                    <option value='min'>- ATTACK</option>
                </select>
                <button className='reset' onClick={(e) => {handleClick(e); cambiarEstado()}}>
                    RESET
                </button>
                {loading && <img className='buscar-gif' src={PokeballWhiteSpinner} alt='busc'></img> }
                <select className='filter' value='default' onChange={e => handleFilterCreated(e)}>
                    <option value='default' disabled hidden>ORIGIN</option>
                    <option value='All'>All</option>
                    <option value='created'>CREATED</option>
                    <option value='api'>API</option> 
                </select>
                <select className='filter' value='default' onChange={e => handleFilterType(e)}>             
                    <option value='default' disabled hidden>TYPE</option>
                    {types.map((t) => (                                 
                            <option value={t.name} key={t.name}>{t.name.toUpperCase()}</option>   
                        ))}
                </select>
            </div>
        
                <div>
                    <Paginado 
                        pokemonsPerPage = {pokemonsPerPage}     
                        allPokemons = {allPokemons.length}      
                        paginado = {paginado}                  
                    />
                </div>
                <div className='orden'>
                    {currentPokemons.length > 0 ?       
                    currentPokemons?.map((p) => {       
                         return (
                            <div key={p.name}>
                                <Link to={"/home/" + p.id} className='link'>
                                    <div>
                                        <Card                   
                                            name={p.name} 
                                            image={p.img ? p.img : p.image} 
                                            types={p.createdInDb ? p.types.map(p => p.name + " ") : p.type.map(p => p + " " )} 
                                            // attack={p.attack}
                                            key={p.id}
                                        />  
                                    </div>
                                </Link>
                            </div>
                            );
                        }) :    <div className='loading-pikachu'>    
                                    <img src={PikachuGif} alt='' width='350px' height='350px'/>  
                                </div> }
                            
                </div>
                <div className='paginado-resp'>
                    <Paginado 
                        pokemonsPerPage = {pokemonsPerPage}     
                        allPokemons = {allPokemons.length}      
                        paginado = {paginado}                   
                    />
                </div>
                </div>
        </div>
    )
}




//---------------------------------------------------------------------------------------------------------------

//DELETE BUTTON

// function handleDelete(e){
    // dispatch(deletePokemon(e.target.value))   //el value será el id
    // }

{/* {p.createdInDb && <button type='button' value={p.id} onClick={e => handleDelete(e)}>X</button>} */}

import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {postPokemon, getTypes} from '../../actions/index';
import swal from'sweetalert2';
import '../PokemonCreate/PokemonCreate.css'


function validate(input){                            
    let errors = {};                                 
    if(!input.name){                               
        errors.name = 'a name is required';      
    }else if(!/^[A-z]+$/.test(input.name)){          
        errors.name = 'only letters allowed'
    }else if(!input.img){
        errors.img = 'an image is required';
    }if (!/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(input.img)) {
        errors.img = 'only URL directions allowed';
    }else if(input.health < 1 || input.health > 200){
        errors.health = 'must be a value between 1 and 200'
    }else if(!/^[0-9]+$/.test(input.health)){ 
        errors.health = 'only numbers allowed'
    }else if(input.attack < 1 || input.attack > 200){
        errors.attack = 'must be a value between 1 and 200'
    }else if(!/^[0-9]+$/.test(input.attack)){ 
        errors.attack = 'only numbers allowed'
    }else if(input.defense < 1 || input.defense > 200){
        errors.defense = 'must be a value between 1 and 200'
    }else if(!/^[0-9]+$/.test(input.defense)){ 
        errors.defense = 'only numbers allowed'
    }else if(input.speed < 1 || input.speed > 200){
        errors.speed = 'must be a value between 1 and 200'
    }else if(!/^[0-9]+$/.test(input.speed)){ 
        errors.speed = 'only numbers allowed'
    }else if(input.height < 1 || input.height > 200){
        errors.height = 'must be a value between 1 and 200'
    }else if(!/^[0-9]+$/.test(input.height)){ 
        errors.height = 'only numbers allowed'
    }else if(input.weight < 1 || input.weight > 200){
        errors.weight = 'must be a value between 1 and 200'
    }else if(!/^[0-9]+$/.test(input.weight)){ 
        errors.weight = 'only numbers allowed'
    }else if(input.type.length < 1){
        errors.type = 'select at least 1 type'
    }
        return errors;     
}

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state) => state.types); 
    const [errors, setErrors] = useState({e:''});      
    const [input, setInput] = useState({               
        name:"",
        img:"",
        health: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        type: [],
    })

    function handleChange(e){                       
        setInput({                                  
            ...input,
            [e.target.name] : e.target.value,       
        })
        setErrors(validate({                        
            ...input,
            [e.target.name] : e.target.value,
        }));
    }

    function handleSelect(e){                       
        if(!input.type.includes(e.target.value)){   
            setInput({
                ...input,
                type: [...input.type, e.target.value],  
            })
        }
        setErrors(validate({                        
            ...input,
            type: [...input.type, e.target.value]
        }))
        
    }

    function handleSubmit(e){                       
        e.preventDefault();
        dispatch(postPokemon(input))                
        //alert("Pokémon Creado Con Éxito!")
        swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Pokémon Created!',
            showConfirmButton: false,
            timer: 2000,
          })
        setInput({                                  
            name:"",
            img:"",
            health: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            type: [],

        });
        history.push('/home');      
    }

    function handleDelete(el){      
        setInput({
            ...input,
            type: input.type.filter(t => t !== el)   
        })
        
    }
    
    useEffect(() => {
        dispatch(getTypes());       
    }, [dispatch]);
    
    return(
        <div className="back-create">
            <Link to='/home'><button className="volver-create">BACK</button></Link>
            <h1 className="title-create">CREATE  YOUR  POKÉMON</h1>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>    
                <div className="formulario">
                    <label>Name: </label>
                    <input type='text' value={input.name} name='name' maxLength="22" placeholder="name..." onChange={(e) => handleChange(e)}/> {/*Cuando hay un cambio en el input Nombre se ejecuta handleChange */}
                    {errors.name && <p className="error">{errors.name}</p>}   
                </div>
                <div className="formulario">
                    <label>Image(URL): </label>
                    <input type='text' value={input.img} name='img' placeholder="image..." onChange={(e) => handleChange(e)}/>
                    {errors.img && <p className="error">{errors.img}</p>}
                </div>
                <div className="formulario">
                    <label>HP: </label>
                    <input type='number' value={input.health} name='health' onChange={(e) => handleChange(e)}/>
                    {errors.health && <p className="error">{errors.health}</p>}
                </div>
                <div className="formulario">
                    <label>Attack: </label>
                    <input type='number' value={input.attack} name='attack' onChange={(e) => handleChange(e)}/>
                    {errors.attack && <p className="error">{errors.attack}</p>}
                </div>
                <div className="formulario">
                    <label>Defense: </label>
                    <input type='number' value={input.defense} name='defense' onChange={(e) => handleChange(e)}/>
                    {errors.defense && <p className="error">{errors.defense}</p>}
                </div>
                <div className="formulario">
                    <label>Speed: </label>
                    <input type='number' value={input.speed} name='speed' onChange={(e) => handleChange(e)}/>
                    {errors.speed && <p className="error">{errors.speed}</p>}
                </div>
                <div className="formulario">
                    <label>Height: </label>
                    <input type='number' value={input.height} name='height' onChange={(e) => handleChange(e)}/>
                    {errors.height && <p className="error">{errors.height}</p>}
                </div>
                <div className="formulario">
                    <label>Weight: </label>
                    <input type='number' value={input.weight} name='weight' onChange={(e) => handleChange(e)}/>
                    {errors.weight && <p className="error">{errors.weight}</p>}
                </div>
                
                <div className="formulario">
                    { input.type.length < 2 ?     
                        <select value='default' onChange={(e) => handleSelect(e)}>    
                            <option value='default' disabled hidden>--type--</option>
                            {types.map((t) => (                        
                            <option value={t.name}>{t.name}</option>    
                            ))} 
                        </select> 
                        : <p className="error">cannot have more than 2 types</p>}

                </div>
                    {errors.type && <p className="error">{errors.type}</p>}   
                
                <div className="type">
                    {input.type.map(el =>                                         
                         <div className="type-content">       
                            <p>{el}</p>                                         
                            <button className="delete-type" type='button' onClick={() => handleDelete(el)}>x</button>     
                         </div>
                    )}
                </div>
                <div className="create-button">
                    {Object.keys(errors).length || !input.type.length ? 
                        <button className="not-ok" type='submit' disabled>please complete the form</button> : 
                        <button className="ok" type='submit'>CREATE</button> }             
                </div>
                
            </form>
            {console.log(input.type)}
        </div>
    )
     
}

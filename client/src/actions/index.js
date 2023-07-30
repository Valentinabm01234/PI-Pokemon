import axios from 'axios';
import swal from'sweetalert2';


export function getPokemons(){
    return async function(dispatch){  
        var json = await axios.get("/pokemons", {});  
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}



export function getNamePokemons(name){
    return async function (dispatch){
        try{
            var json = await axios.get("/pokemons?name=" + name);
            return dispatch({
                type: "GET_NAME_POKEMONS",
                payload: json.data
            })
        }catch(error){
            return swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Pokémon Not Found',
                showConfirmButton: false,
                timer: 2000
              })
            
        }
    }
}

export function getTypes(){               
    return async function(dispatch){
        var info = await axios.get("/types", {});  
        return dispatch({
            type: "GET_TYPES",             
            payload: info.data           
        })
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        const response = await axios.post("/pokemons", payload);
        return response;
    }
}

export function filterCreated(payload){         
    return{
        type: "FILTER_CREATED",         
        payload,                       
    }
}

export function filterType(payload){
    
    return{
        type: "FILTER_TYPE",
        payload,
    }
}

export function orderByName(payload){
    return { 
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByAttack(payload){
    return {
        type: "ORDER_BY_ATTACK",
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get('/pokemons/' + id);
            return dispatch({ type: "GET_DETAILS", payload: json.data })
        }catch(error){
            console.log(error)
        }
    }
}

export function cleanDetail(){
    return {
        type: "CLEAN_DETAIL"
    }
}


//--------------------------------------------------------------------------------------------------------------

// GET POKEMONS en Promesas:

// export function getPokemons(){                  
//     return async function(dispatch){
//         return fetch('http://localhost:3001/pokemons')      //Request GET a la Api por medio de la ruta del back
//         .then(response => response.json())                  //con .then capturo la respuesta del fetch. que es un obj .json y lo convierto en obj .js
//         .then(info => {                                     //info es un argumento custom, y va a contener el valor del obj response ya convertido a .js
//             dispatch({type: 'GET_POKEMONS', payload: info}) //Despacha la action GET_POKEMONS con el obj response.js como payload
//         })
//     }
// }

//GET NAME POKEMONS en Promesas:

// export function getNamePokemons(name) {
//     return function(dispatch){
//       axios.get("/pokemons?name=" + name)
//         .then(r => r.data)
//         .then(data => dispatch({ type: "GET_NAME_POKEMONS", payload: data }))
//     }
//   }

// DELETE POKEMON:

// export function deletePokemon(id){
//     return async function(dispatch){
//         try{
//             var json = await axios.delete('/delete-pokemons/' + id);
//             return dispatch({ type: "DELETE_POKEMON", payload: json.data})
//         }catch(error){
//             console.log(error)
//         }
//     }
    

// }
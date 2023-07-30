
const initialState = {
    pokemons: [],                                      
    allPokemons: [],                                    
    types: [],
    detail: [],
};

function rootReducer(state = initialState, action) {    
    switch(action.type) {
        case "GET_POKEMONS":
            return{
                ...state,                               
                pokemons: action.payload,               
                allPokemons: action.payload              
            }
        case "FILTER_CREATED":
            const fullPokemons = state.allPokemons
            const createdFilter = action.payload === 'created' ?    
                    fullPokemons.filter(el => el.createdInDb) :     
                    fullPokemons.filter(el => !el.createdInDb)      
            return {
                ...state,
                pokemons: action.payload === 'All' ?                    
                            state.allPokemons : createdFilter                
            }
        case "FILTER_TYPE":
            let fullPokemons2 = state.allPokemons
            let resultApi = fullPokemons2.filter(p => p.type && p.type.includes(action.payload))
            let resultDb = fullPokemons2.filter(p => p.types && p.types.map(t => t.name).includes(action.payload))
            let result = resultApi.concat(resultDb)
            return {
                ...state,
                pokemons: result
            }

        case "ORDER_BY_NAME":
            let sortedArr = action.payload === 'asc' ?
                state.pokemons.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                state.pokemons.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    pokemons: sortedArr
                }
        case "ORDER_BY_ATTACK":
            let sortedAttack = action.payload === 'max' ?
                state.pokemons.sort(function(a, b){
                    if(a.attack < b.attack) {
                        return 1;
                    }
                    if(b.attack < a.attack) {
                        return -1;
                    }
                    return 0;
                }) :
                state.pokemons.sort(function(a, b){
                    if(a.attack < b.attack) {
                        return -1;
                    }
                    if(b.attack < a.attack) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    pokemons: sortedAttack
                }

        case "GET_TYPES":
            return{
                ...state,
                types: action.payload
            }
        case "POST_POKEMON":
            return{
                ...state,
            }
        case "GET_DETAILS":
            return{
                ...state,
                detail: action.payload
            }
        case "CLEAN_DETAIL":
            return{
                ...state,
                detail: []

            }
        case "GET_NAME_POKEMONS":
                return{
                    ...state,
                    pokemons: action.payload
                }

        default:
            return state;
    }
}

export default rootReducer;

//---------------------------------------------------------------------------------------------------------------

//DELETE POKEMON:

   // case "DELETE_POKEMON":
            
        //     // let filtDb = state.allPokemons.filter(el => el.id !== action.payload)
        //     // let final = filtDb.filter(el => !el.action.payload)
        //     console.log(action.payload)
        //     return{
        //         ...state,
        //         pokemons: action.payload,
        //     }   
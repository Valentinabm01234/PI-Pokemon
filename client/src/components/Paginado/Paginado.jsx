import React from "react";
import '../Paginado/Paginado.css';

export default function Paginado({pokemonsPerPage, allPokemons, paginado}){     
    const pageNumbers = []     

    for(let i = 0; i <= Math.ceil(allPokemons/pokemonsPerPage) - 1; i++){
        pageNumbers.push(i + 1)
    }

    return(
        <nav>
            <ul className="paginado" key='pag'> 
                { pageNumbers &&              
                    pageNumbers.map(number => (
                    // <li className="number" key={number}>
                        //<a onClick={() => paginado(number)}>{number}</a>  
                        <button className="number" key={number} onClick={() => paginado(number)}>{number}</button>
                    //</li>
                ))}

            </ul>
        </nav>
    )
}
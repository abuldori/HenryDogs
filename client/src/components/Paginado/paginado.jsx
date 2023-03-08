import React from "react";
import style from "./Paginado.module.css"

const Paginado = ({dogsPerPage, allDogs, paginado, currentPage}) => {
    const pageNumbers = []
    for (let i = 1; i <=Math.ceil(allDogs.length/dogsPerPage); i++) {
        pageNumbers.push(i)
    };
    const previusPage = () => {
        if(currentPage > 1) {
            paginado(currentPage - 1);
        }
    };
    
    const nextPage = () => {
        const totalPages = Math.ceil(allDogs.length/dogsPerPage);
            if(currentPage < totalPages){
                paginado(currentPage + 1);
        }
    };

    return(
        <nav className={style.pag}>
            <ul>
                <li className={style.lis}>
                    <button onClick={previusPage}>Prev</button>
                </li>
                    { pageNumbers?.map(number => (
                <li  className={style.lis} key={number}>
                        <button onClick={() => paginado(number)}>{number}</button>
                </li>
                ))}
                <li className={style.lis}>
                    <button onClick={nextPage}>Next</button>
                </li>
            </ul>
        </nav>
    )
}

export default Paginado;
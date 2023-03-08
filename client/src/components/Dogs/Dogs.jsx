import React from "react";
import style from "./Dogs.module.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDogs, getTemperaments, orderName, orderWeight, filterCreated, fiterTemp} from "../../redux/actions";
import DogCard from "../DogCards/DogCard";
import Paginado from "../Paginado/paginado";
import SearchBar from "../SeachBar/SearchBar";
import { Link } from "react-router-dom";

const Dogs = () => {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.allTemperaments);
    const [order, setOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage // 8
    const indexOfFirstDog = indexOfLastDog - dogsPerPage // 0
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        dispatch(getDogs())
    },[])
    
    useEffect(() => {
        dispatch(getTemperaments())
    },[dispatch])
    
    const handleFilterCreated = (e) => {
        dispatch(filterCreated(e.target.value))
    };
    
    const handleSortName = (e) => {
        e.preventDefault();
        dispatch(orderName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenar ${e.target.value}`)
    }
    
    const handleSortWeight = (e) => {
        e.preventDefault();
        dispatch(orderWeight(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenar ${e.target.value}`)
        
    }
    
    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getDogs())
    }
    
    const handleFiltTemp = (e) => {
        dispatch(fiterTemp(e.target.value))
    }
    
    
    return ( 
        
        <div className={style.contenedor}>
        
        <h1 className={style.h1}>PERROS</h1>
           
            <div className={style.dogscontenedorprincipal}>


            <select className={style.selec} onChange={(e) => handleFiltTemp(e)}>
            <option value="All" >Temperamentos</option>
            {temperaments?.map((t) => {
                return (
                    <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              );
            })}
          </select>

                <select className={style.selec} value="" onChange={e=> handleSortName(e)}>
                    <option value="" disabled >Orden por nombre</option>
                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                </select>

                <select className={style.selec} value="" defaultValue={"Default"} onChange={e=> handleSortWeight(e)}>
                    <option value="" disabled>Orden por Peso</option>
                    <option value="asc">Min</option>
                    <option value="des">Max</option>
                </select>

                <select className={style.selec} value="" onChange={e => handleFilterCreated(e)}>
                <option value="" disabled >Filtrar</option>
                    <option value="created">Creado</option>
                    <option value="api">Existente</option>
                </select>

                <button className={style.selec} onClick={handleClick}>
                    Todos los Perros
                </button>

            </div>
                <SearchBar setCurrentPage={setCurrentPage}/>
                <div className={style.conteinerNav}>
                     <Link to='/dog'className={style.nav} >Crea tu Perro🐾</Link>
                </div>
            
            <div className={style.nef}>

        {currentDogs?.map(({id, name, temperaments, weight, image, createInDb}) => {         
            return <div className={style.div} key={id}>
                 <DogCard
                   key={id}
                   id={id}
                   name={name}
                   image={image}
                   temperaments={temperaments}
                   weight={weight}
                   createInDb={createInDb}
                    />
                 </div>
        })}
        </div>

          <div className={style.paginado}>

            <Paginado 
                dogsPerPage={dogsPerPage}
                allDogs={allDogs}
                paginado={paginado}
                currentPage={currentPage}
            />

            </div>
        </div>
    
     
     )
}

export default Dogs;
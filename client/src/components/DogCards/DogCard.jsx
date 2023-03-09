import style from "./DogCard.module.css";
import React from "react";
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletedDogs, getDogs } from "../../redux/actions";


let DogCard = ( {id, name, image, temperaments, weight, createInDb }) => {
    const dispatch = useDispatch();
   

    const handleDeleteDog = (id) => {
        dispatch(deletedDogs(id))
        .then(() => getDogs() )  
      }
      
    return (
        <div className={style.contenedorPadre}>
            <div className={style.contenedor}>
                
                <div className={style.div}>
                    
                <Link to={`/detail/${id}`}>
                    <img src={image} alt={name} className={style.image}/>
                </Link>
                    <label className={style.label}>Nombre:</label>
                        <p className={style.p}>{name}</p>
                
                    <label className={style.label}>Temperamentos:</label>
                        <p className={style.p}>{temperaments?.join(", ")}</p>
                    
                    <label className={style.label}>Peso min - max</label>  
                        <p className={style.p}>{weight}</p>
                    {createInDb  && (
                             <button onClick={() => {
                                if (window.confirm('¿Está seguro de que desea eliminar este perro?')) {
                                  handleDeleteDog(id);
                                }
                              }}>X</button>
                          )}    
                </div>
            </div>
        </div>
    )
}

export default DogCard;
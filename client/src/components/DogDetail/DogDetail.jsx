import React from "react";
import { getDogDetail, cleanDetail} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./DogDetail.module.css"

const DogDetail = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const  {image, name, weight, height, temperaments, life_span } = useSelector((state) => state.dogsDetail)
    
    useEffect(() =>{
        dispatch(getDogDetail(id))

       return () => dispatch(cleanDetail())
    }, [id])
    
    return(
        
        <div className={style.contenedor}>
           
            <img src={image} alt="Dog playing" className={style.img}/>
           
            <h1 className={style.h1}>Detalles</h1>

            <label className={style.label}>Nombre:</label>
                <p>{name}</p>
            <label className={style.label}>Peso:</label>
                <p>{weight} kilos</p>
            <label className={style.label}>Altura:</label>
                <p>{height} cms</p>
            <label className={style.label}>Temperamentos:</label>
                <p>{temperaments?.join(", ")}</p>
            <label className={style.label}>Años de vida:</label>
                <p>{life_span}</p>
                
            
            <Link to='/home' className={style.selec}> Volver </Link>
            
        </div>
    )
}

export default DogDetail;
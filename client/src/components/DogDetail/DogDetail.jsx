import React from "react";
import { getDogDetail, cleanDetail} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./DogDetail.module.css"
import flecha from "../../assets/flecha.png"

const DogDetail = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const  {image, name, weight, height, temperaments, life_span } = useSelector((state) => state.dogsDetail)
    
    useEffect(() =>{
        dispatch(getDogDetail(id))

       return () => dispatch(cleanDetail())
    }, [id])
    
    return(
        <div className={style.contenedorPadre}>
          {name ? (
        <div className={style.contenedor}>
            <h1 className={style.h1}>Detalles</h1>
           
            <img src={image} alt="Dog playing" className={style.img}/> 
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
               
                <Link to='/home' className={style.selec} style={{ backgroundImage: `url(${flecha})`, width: "50px", height: "50px", backgroundSize: "cover", display: "inline-block" }}></Link>     
        </div>
         ) : (
            <a href="https://www.gifsanimados.org/cat-perros-202.htm">
                <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0727.gif" className={style.loading} /></a>        
)}
        </div>
        
    )
}

export default DogDetail;
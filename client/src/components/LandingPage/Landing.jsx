import { Link } from "react-router-dom";
import style from "./Landing.module.css" 

const LandingPage = () => {
    return(
        <div className={style.containerlanding}> 

        <div className={style.containerApp}>
            <h1 className={style.h1}>Una aplicación de Perros</h1>
        </div>

         <div className={style.containerAp}>
            <button className={style.btn}>
                <Link className={style.traerperros} to='/home'>Traer perros🐶</Link>
            </button>
        </div>
        </div>
    )
}


export default LandingPage;
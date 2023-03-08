import { Link } from "react-router-dom";
import style from "./Landing.module.css" 

const LandingPage = () => {
    return(
        <div className={style.doganimation}> 

        <div className={style.container}>
            <h1 className={style.h1}>Una aplicación de Perros</h1>

            <h3 className={style.h3}></h3>

            <button className={style.btn}>
                <Link to='/home'>Traer perros🐶</Link>
            </button>
        </div>
        </div>
    )
}


export default LandingPage;
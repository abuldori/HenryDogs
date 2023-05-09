import { Link } from "react-router-dom";
import style from "./Landing.module.css" 
import perrito from "../../assets/perrito.png"

const LandingPage = () => {
    return(
        <div> 

        <div className={style.contect}>
            <h1 className={style.title}>Hernry Dogs</h1>
        </div>

        <div className={style.container}>
        <div className={style.gifDiv}>
           <img className={style.gifimg} src={perrito} alt="Descripción del GIF" />
        </div>
        </div>

         <div className={style.conteinerbtn}>
            <button className={style.button}>
                <Link  to='/home'>Ingresar</Link>
            </button>
        </div>
        </div>
    )
}


export default LandingPage;
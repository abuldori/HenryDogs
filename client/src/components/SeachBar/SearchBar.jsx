import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByRace } from "../../redux/actions";
import style from "./SearchBar.module.css"


const SearchBar = ({setCurrentPage}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    

    const handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(searchByRace(name))
        setCurrentPage(1)
    }  
    
    return (
            <div className={style.centrar1}>
            <input className={style.input}
                type = "text"
                placeholder="Buscar..."

                onChange={handleInputChange}
                />
                   
            <button className={style.btns} type="submit" onClick={handleSubmit}>Buscar</button>
                
           </div>
          
    )
}

export default SearchBar;
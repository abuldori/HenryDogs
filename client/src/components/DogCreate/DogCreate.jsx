import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../redux/actions";
import style from "./DogCreate.module.css";
import validate from "./validate";

const DogCreate = () => {
  const temperaments = useSelector((state) => state.allTemperaments);
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  
  const [input, setInput] = useState({
    name: "",
    height: [],
    weight: [],
    life_span: [],
    image: [],
    temperaments: [],
  });
  
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
      );
    };
    
    const handleSubmit = (e) => {
      if (
        !input.name ||
        !input.height ||
        !input.weight ||
        !input.life_span ||
        !input.image ||
        input.temperaments.length === 0
        ) {
          alert("Por favor complete todos los campos");
          return;
        }
        dispatch(postDog(input));
        alert("Personaje creado");
        
        setInput({
          name: "",
          image: [],
          height: [],
          weight: [],
          life_span: [],
          temperaments: [],
        });
        history.push("/home"); // se puede hacer o no! redirige al usuario para ver al personaje creado
      };
      
      const handleSelect = (e) => {
        setInput({
          ...input,
          temperaments: [...input.temperaments, e.target.value],
        });
        e.target.value = "";
      };
      
      const handleDelete = (e) => {
        setInput({
          ...input,
          temperaments: input.temperaments.filter(temp => temp !== e)
        });

      }

      useEffect(() => {
        dispatch(getTemperaments());
      }, [dispatch]);
      

      return (
        <div className={style.container}>
      <Link to="/home">
        <button className={style.btn}>Volver</button>
      </Link>

      <h1>Crea tu personaje</h1>
      <form className={style.container} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className={style.name}>
            Nombre:
          </label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
            className={style.input}
          />
          {errors.name && <p className={style.name2}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="height" className={style.name}>
            Altura: min - max
          </label>
          <input
            type="text"
            name="height"
            value={input.height}
            onChange={handleChange}
            className={style.input}
          />
          {errors.height && <p className={style.name2}>{errors.height}</p>}
        </div>
        <div>
          <label htmlFor="weight" className={style.name}>
            Peso: min - max
          </label>
          <input
            input
            type="text"
            name="weight"
            value={input.weight}
            onChange={handleChange}
            className={style.input}
          />
          {errors.weight && <p className={style.name2}>{errors.weight}</p>}
        </div>
        <div>
          <label htmlFor="life_span" className={style.name}>
            Años de vida: min - max
          </label>
          <input
            type="text"
            name="life_span"
            value={input.life_span}
            onChange={handleChange}
            className={style.input}
          />
          {errors.life_span && (
            <p className={style.name2}>{errors.life_span}</p>
          )}
        </div>
        <div>
          <label htmlFor="image" className={style.name}>
            Imagen:
          </label>
          <input
            type="text"
            name="image"
            value={input.image}
            onChange={handleChange}
            className={style.input}
          />
          {errors.image && (
          <p className={style.name2}>{errors.image}</p>)}
        </div>
        <div>
          <select className={style.name} onChange={(e) => handleSelect(e)}>
            <option value="">Temperamentos</option>
            {temperaments?.map((t) => {
              return (
                <option key={t.id} name="temperament" value={t.name}>
                  {t.name}
                </option>
              );
            })}
          </select>
          <ul>
            <li className={style.name}>
              {input.temperaments.map((el) => el + " ")}
            </li>
          </ul>
          <button className={style.btn2} type="submit">
            Crear personaje
          </button>
        </div>
      </form>
            {input.temperaments.map(e => 
              <div>
                <p className={style.name}>{e}</p>
                <button className={style.btnDelete} onClick={() => handleDelete(e)}>X</button>
              </div>)}

    </div>
  );
};

export default DogCreate;

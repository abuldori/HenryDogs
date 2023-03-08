import axios, { all } from "axios";
import {
  GET_DOGS,
  DOG_DETAIL,
  CLEAN_DETAIL,
  GET_TEMPERAMENTS,
  FILTER_TEMP,
  FILTER_CREATED,
  ORDER_NAME,
  SEARCH_RACE,
  POST_DOG,
  ORDER_WEIGHT,
  DELETE_DOG,
} from "./actionTypes";

export const getDogs = () => {
  return async (dispatch) => {
    try {
      const response = await axios("http://localhost:3001/dogs");
      const data = response.data;
      return dispatch({
        // despacho la action
        type: GET_DOGS,
        payload: data, // data ->lo que me devuelve la aciton
      });
    } catch (error) {
      return error.message;
    }
  };
};

export const getDogDetail = (id) => {
  return async (dispatch) => {
    try {
      let response = await axios(`http://localhost:3001/dogs/${id}`);
      return dispatch({ type: DOG_DETAIL, payload: response.data });
    } catch (error) {
      return error.message;
    }
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const response = await axios("http://localhost:3001/temperaments", {});
      const data = response.data;
      return dispatch({
        // despacho la action
        type: GET_TEMPERAMENTS,
        payload: data, // data ->lo que me devuelve la aciton
      });
    } catch (error) {
      return error.message;
    }
  };
};

export const postDog = (payload) => {
  return async (dispatch) => {
    const response = await axios.post("http://localhost:3001/dogs", payload);
    console.log(response);
    // console.log(payload);
    return dispatch({ type: POST_DOG, response });
  };
};

export const fiterTemp = (payload) => {
  return { type: FILTER_TEMP, payload };
};

export const filterCreated = (payload) => {
  // payload va a ser el value
  return { type: FILTER_CREATED, payload };
};

export const orderName = (payload) => {
  return { type: ORDER_NAME, payload };
};

export const orderWeight = (payload) => {
  return { type: ORDER_WEIGHT, payload };
};

export const searchByRace = (payload) => {
  return async (dispatch) => {
    try {
      let response = await axios(`http://localhost:3001/dogs?name=${payload}`);
      return dispatch({ type: SEARCH_RACE, payload: response.data });
    } catch (error) {
      alert("No se encontro el nombre");
    }
  };
};

export const deletedDogs = (id) => {
    return async (dispatch) => {
      const { data } = await axios.delete(`http://localhost:3001/dogs/${id}`);

      return dispatch({
        type: DELETE_DOG,
        payload: data,
      })
    };
  };

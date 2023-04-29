import {
    DOG_DETAIL,
    GET_DOGS,
    CLEAN_DETAIL,
    GET_TEMPERAMENTS,
    FILTER_TEMP,
    FILTER_CREATED,
    ORDER_NAME,
    SEARCH_RACE,
    POST_DOG,
    ORDER_WEIGHT,
    DELETE_DOG
} from "./actionTypes";

const inicialState = {
    dogs: [],
    dogsDetail: {},
    allTemperaments: [],
    allDogs: [],
    newDogs: []
};

const reducer = ( state = inicialState, action ) => {
    switch ( action.type ) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            };
        case DOG_DETAIL:
            return {
                ...state,
                dogsDetail: action.payload
            };
        case CLEAN_DETAIL:
            return {
                ...state,
                dogsDetail: {}
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: action.payload
            };
        case FILTER_TEMP:
            const allDogsTemp = state.allDogs;
            const filterByTemp = action.payload === 'All'
            ? allDogsTemp
            : allDogsTemp.filter(e => e.temperaments.find(temperaments => temperaments === action.payload));
            console.log(allDogsTemp);
            return {
                ...state,
                dogs: filterByTemp
            };
        case FILTER_CREATED:
            const createdFilter = action.payload === "created" 
            ? state.allDogs.filter(el => el.createInDb ) 
            : state.allDogs.filter(el => !el.createInDb );
            return {
                ...state,
                dogs: action.payload === "All" 
                ? state.allDogs 
                : createdFilter
            };
        case ORDER_NAME:
            let sortedByName = action.payload === 'asc' ? state.dogs.sort( ( a, b ) => {
                if ( a.name.toLowerCase() > b.name.toLowerCase() ) {
                    return 1;
                }
                if ( a.name.toLowerCase() < b.name.toLowerCase() ) {
                    return -1;
                }
                return 0;
            } ) : state.dogs.sort( ( a, b ) => {
                if ( a.name.toLowerCase() < b.name.toLowerCase() ) {
                    return 1;
                }
                if ( a.name.toLowerCase() > b.name.toLowerCase() ) {
                    return -1;
                }
                return 0;
            } )
            return {
                ...state,
                dogs: sortedByName
            };
        case ORDER_WEIGHT:
            let OrderByWeight = state.allDogs;
            if ( action.payload === "asc" ) {
                OrderByWeight.sort( ( a, b ) => parseInt( a.weight ) - parseInt( b.weight ) );
            } else {
                OrderByWeight.sort( ( a, b ) => parseInt( b.weight ) - parseInt( a.weight ) );
            }

            return {
                ...state,
                allDogs: OrderByWeight
            }
        case SEARCH_RACE:
            return {
                ...state,
                dogs: action.payload
            };
        case POST_DOG:
            return {
                ...state
            };
        case DELETE_DOG: 
            const filter = state.newDogs?.filter(d => d.id !== action.payload);
  
            return {
                ...state,
                newDogs: filter,
                dogs: filter,
                
           
        }
        //Primero, se filtran los elementos de la matriz state.allDogs que tienen un ID diferente al que se está pasando en el objeto action.payload. El resultado es una nueva matriz llamada filteredAllDogs que excluye el elemento correspondiente al ID pasado.
     
        // Finalmente, se devuelve un nuevo objeto de estado que incluye el estado anterior (...state) y la nueva propiedade: allDogs (que es la matriz de perros filtrada ).
        // En resumen, este código maneja el caso en que un perro se elimina de la aplicación y actualiza el estado de la aplicación para reflejar ese cambio.
        default:
            return {
                ...state
            };
    }
};

export default reducer;

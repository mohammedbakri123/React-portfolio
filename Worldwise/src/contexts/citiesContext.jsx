/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useEffect, useReducer } from "react";

const citiesContext = createContext();
const BASE_URL = "http://localhost:8001";

const initalState = {
  cities :[],
  isloading : false,
  currentCity: {},
  error: "",
}

function reducer(state, action) {

  switch (action.type) {
    case 'loading':
      return { ...state , isloading :true}


    case 'cities/loaded':
      return {...state , cities: action.payload , isloading: false}


    case 'cities/created':
      return {...state , cities:[...state.cities, action.payload]}
      
    case 'cities/deleted':
      return { ...state, cities:[ state.cities.filter((city) => city.id !== action.payload)] }
    
    case  'city/loaded':
      return {...state , isloading:false , currentCity: action.payload}
    
    case 'rejected':
      return {...state ,isloading:false , error: action.payload }

    default:
      throw new Error("Unknown action type")
      
         
  }
  
}

export function CitiesProvider({ children }) {

  // const [cities, setCities] = useState([]);
  // const [isloading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [{cities , isloading , currentCity,} , dispatch] = useReducer(reducer , initalState)

  const GetCity = useCallback(async function GetCity(id) {

    if (Number(id) === currentCity.id) return;
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({type:'city/loaded' , payload:data})
    } catch (error) {
      dispatch({ type: 'rejected', payload: "there is no city" });
    }
  },[currentCity.id]);

  async function CreateCity(city) {
            dispatch({ type: 'loading' });
    try {

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();
      
      dispatch({type:"cities/created" , payload:city})
    } catch (error) {
      dispatch({ type: 'rejected', payload: "failed to create city" });
    }
  }

  async function DeleteCity(id) {
     dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({type:"cities/deleted" , payload:id })
    } catch (error) {
      dispatch({ type: 'rejected', payload: "failed to delete city" });
    }
  }

  useEffect(() => {
    async function FetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: 'rejected', payload:"there is no cities"})
      }
    }
    FetchCities();
  }, []);
  return (
    <citiesContext.Provider value={{ cities, isloading, currentCity, GetCity, CreateCity , DeleteCity }}>
      {children}
    </citiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined)
    throw new Error("Cities Context was used outside cities provider");
  return context;
}

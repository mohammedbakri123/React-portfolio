/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "123@e.com",
  password: "123",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

const initalstate = {
    isAuthenticated: false,
    user: null
}

function reducer(state , action) {
    switch (action.type) {
        case 'login':
            return { ...state , isAuthenticated: true, user: action.payload }
        
        case 'logout':
            return { ...state , isAuthenticated: false, user: null }
        
        default:
            throw new Error("Unknown Action")
        
    }
}

export function AuthProvider({ children }) {
    
    const[{isAuthenticated,user} , dispatch] = useReducer(reducer , initalstate)
    
    function login(username, password) {
        if (username === FAKE_USER.email && password === FAKE_USER.password)
            dispatch({ type: 'login', payload: FAKE_USER });
        
    }
    function logout() {
        dispatch({ type: 'logout' });
        
    }

    return <AuthContext.Provider value={{login , logout , isAuthenticated , user}}>
       {children}
   </AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("authContext was used outside AuthProvider")
    return context;
}
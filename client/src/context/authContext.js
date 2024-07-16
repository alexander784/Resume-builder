import React, { useReducer } from 'react';


const AuthContext = React.createContext()


const AuthProvider = () => {
    // initialAuthState
    const initialAuthState = {
        loading: false,
        currentUser:null,
        error:"",
    };

    // authReducer
    const authReducer = (state, action) => {
        switch(action.type) {
            case "FETCH_REQUEST":
                return {
                    ...state,
                    loading:true,
                    currentUser:null,
                    error: "",
                };
            case "FETCH_SUCCESS":
                return {
                    ...state,
                    loading:false,
                    currentUser:action.payload,
                    error:"",
                };

            case "FETCH_FAILURE":
                return {
                    ...state,
                    loading:false,
                    currentUser:null,
                    error:action.payload,
                };

            default:
                return state;

        }
    };
    const [authState, dispatchForAUthState] = useReducer(authReducer, initialAuthState);
    
}
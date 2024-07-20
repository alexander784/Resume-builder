import React, { useContext, useReducer } from 'react';

const TemplateContext = React.createContext();

const TemplateProvider = ({ children }) => {
    const initialTemplateState = {
        loading: false,
        template: [],
        error: "",
    };

    const templateReducer = (state, action) => {
        switch (action.type) {
            case "FETCH_REQUEST":
                return {
                    ...state,
                    loading: true,
                    template: [],
                    error: "",
                };
            case "FETCH_SUCCESS":
                return {
                    ...state,
                    loading: false,
                    template: action.payload,
                    error: "",
                };
            case "FETCH_FAILURE":
                return {
                    ...state,
                    loading: false,
                    template: [],
                    error: action.payload,
                };
            default:
                return state;
        }
    };

    const [templateState, dispatchForTemplate] = useReducer(templateReducer, initialTemplateState);

    return (
        <TemplateContext.Provider value={{ templateState, dispatchForTemplate }}>
            {children}
        </TemplateContext.Provider>
    );
};

const useGlobalTemplateContext = () => {
    return useContext(TemplateContext);
};

export { TemplateProvider, useGlobalTemplateContext };

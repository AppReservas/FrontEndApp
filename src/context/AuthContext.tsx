import React, { createContext, useReducer } from "react";
import reservasApi from "../api/reservasApi";
import { LoginData, LoginResponse, Usuario } from "../interfaces/appInterfaces";
import { authReducer, AuthState } from "./AuthReducer";

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: () => void;
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer(authReducer, authInicialState);

    const signIn = async({ correo, password }: LoginData) => {
        
        try {
            const { data } = await reservasApi.post<LoginResponse>('/auth/login',{ correo, password });
            dispatch({
                type:'signUp',
                payload: {
                    token:data.token,
                    user: data.usuario
                }
            });
            
        } catch (error) {
            console.log( );
            dispatch({
                type: 'addError',
                payload: 'Informacion incorrecta'
            })
        }
    };

    const signUp = () => {};
    const logOut = () => {};
    const removeError = () => {
        dispatch({ type: 'removeError'})
    };
    
    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signUp,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )

}
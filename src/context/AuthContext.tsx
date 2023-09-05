import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reservasApi from "../api/reservasApi";
import { LoginData, LoginResponse, RegisterData, Usuario } from "../interfaces/appInterfaces";
import { authReducer, AuthState } from "./AuthReducer";

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ( registerData: RegisterData ) => void;
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
    
    useEffect(() => {
        validateToken();
    
    
    }, [])

    const validateToken =async () => {
       const token = await AsyncStorage.getItem('token');
       
       // No token, no autenticado
       if ( !token ) return dispatch({ type:'notAuthenticated' });

       // Hay token
       const resp = await reservasApi.get('/auth');
       if (resp.status !== 200 ) {
        return dispatch({ type: 'notAuthenticated' });
       }

       await AsyncStorage.setItem('token', resp.data.token );
       dispatch({
        type:'signUp',
        payload: {
            token:resp.data.token,
            user: resp.data.usuario
        }
    });
   
    }     

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

            await AsyncStorage.setItem('token', data.token)
            
        } catch (error:any) {
            console.log( );
            dispatch({
                type: 'addError',
                payload: error.resp.data.msg || 'Informacion incorrecta'
            })
        }
    };

    const signUp = async( { nombre,correo,password }: RegisterData ) => {
        try {
            const { data } = await reservasApi.post<LoginResponse>('/usuarios', { correo,password,nombre})
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });
            await AsyncStorage.setItem('token',data.token);
        } catch (error:any) {
            dispatch({
                type:'addError',
                payload: error.response.data.errors[0].msg || 'Revise la información'
            })
            
        }
    };

    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' })
    };
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
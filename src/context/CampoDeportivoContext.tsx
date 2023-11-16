import React, { createContext, useEffect, useState } from "react";
import { Cancha, CanchasResponse } from "../interfaces/appInterfaces";
import reservasApi from "../api/reservasApi";

type CanchaContextProps = {
    canchas: Cancha[];
    loadCanchas: () => Promise<void>;
    addCancha: ( establecimientoId:string, canchaName: string) => Promise<Cancha>;
    updateCancha: ( establecimientoId: string, canchaName: string, canchaId: string) => Promise<void>;
    deleteCancha: ( id: string ) => Promise<void>
    loadCanchaPorId: (id: string) => Promise<Cancha>
    uploadImage: ( data: any, id: string) => Promise<void>
}
export const CampoDeportivoContext = createContext({} as CanchaContextProps);

export const CanchaProvider = ({ children }: any) => {

    const [canchas, setCanchas] = useState<Cancha[]>([])
    
    useEffect (() => {
        loadCanchas();
    }, [])

    const loadCanchas = async() => {
        const resp = await reservasApi.get<CanchasResponse>('/camposdeportivos?limite=50');
        setCanchas([ ...resp.data.canchas]);
    };

    const addCancha = async( establecimientoId: string, canchaName: string): Promise<Cancha> => {
        const resp = await reservasApi.post<Cancha>('/camposdeportivos', {
            nombre: canchaName,
            establecimiento: establecimientoId
        });
        setCanchas([ ...canchas, resp.data]);

        return resp.data;
    };

    const updateCancha =async (estableciminetoId:string, canchaName: string, canchaId: string) => {
        const resp = await reservasApi.put<Cancha>(`/camposdeportivos/${ canchaId}`, {
            nombre: canchaName,
            establecimiento: estableciminetoId
        });
        setCanchas( canchas.map( cancha => {
            return ( cancha._id === canchaId ) ? resp.data : cancha;
        }));
    }

    const deleteCancha =async (id: string) => {
        
    }

    const loadCanchaPorId = async(id: string): Promise<Cancha> => {
        const resp = await reservasApi.get<Cancha>(`/camposdeportivos/${id}`);
        return resp.data;
    }

    const uploadImage =async (data:any, id: string) => {
        
    }


    return(
        <CampoDeportivoContext.Provider value={{
            canchas,
            loadCanchas,
            addCancha,
            updateCancha,
            deleteCancha,
            loadCanchaPorId,
            uploadImage
        }}>
            {children}
        </CampoDeportivoContext.Provider>
    )
} 
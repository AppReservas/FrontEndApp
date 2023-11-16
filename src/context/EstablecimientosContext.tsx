import React, { createContext, useEffect, useState } from "react";
import { Establecimiento, EstablecimientosResponse } from "../interfaces/appInterfaces";
import reservasApi from "../api/reservasApi";

type EstablecimientoContextProps = {
    establishments: Establecimiento[];
    loadEstablecimientos: () => Promise<void>;
    addEstablecimiento: ( adress:string, establecimientoName: string, phone: number) => Promise<Establecimiento>;
    updateEstablecimiento: ( adress: string, establecimientoName: string, phone: number,  establecimientoId: string) => Promise<void>;
    deleteEstablecimiento: ( id: string ) => Promise<void>
    loadEstablecimientoPorId: (id: string) => Promise<Establecimiento>
    uploadImage: ( data: any, id: string) => Promise<void>
}
export const EstablecimientoContext = createContext({} as EstablecimientoContextProps);

export const EstablecimientoProvider = ({ children }: any) => {

    const [establishments, setEstablishments] = useState<Establecimiento[]>([])
    
    useEffect (() => {
        loadEstablecimientos();
    }, [])

    const loadEstablecimientos = async() => {
        const resp = await reservasApi.get<EstablecimientosResponse>('/establecimientos?limite=50');
        setEstablishments([ ...resp.data.establecimientos]);
    };

    const addEstablecimiento = async( adress: string, establecimientoName: string, phone: number): Promise<Establecimiento> => {
        const resp = await reservasApi.post<Establecimiento>('/establecimientos', {
            nombre: establecimientoName,
            direccion: adress,
            telefono: phone

        });
        setEstablishments([ ...establishments, resp.data]);

        return resp.data;
    };

    const updateEstablecimiento =async (adress:string, establecimientoName: string, phone: number, establecimientoId: string) => {
        const resp = await reservasApi.put<Establecimiento>(`/establecimientos/${ establecimientoId}`, {
            nombre: establecimientoName,
            direccion: adress,
            telefono: phone
        });
        setEstablishments( establishments.map( establecimiento => {
            return ( establecimiento._id === establecimientoId ) ? resp.data : establecimiento;
        }));
    }

    const deleteEstablecimiento =async (id: string) => {
        
    }

    const loadEstablecimientoPorId = async(id: string): Promise<Establecimiento> => {
        const resp = await reservasApi.get<Establecimiento>(`/establecimientos/${id}`);
        return resp.data;
    }

    const uploadImage =async (data:any, id: string) => {
        
    }


    return(
        <EstablecimientoContext.Provider value={{
            establishments,
            loadEstablecimientos,
            addEstablecimiento,
            updateEstablecimiento,
            deleteEstablecimiento,
            loadEstablecimientoPorId,
            uploadImage
        }}>
            {children}
        </EstablecimientoContext.Provider>
    )
} 
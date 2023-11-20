import React, { createContext, useEffect, useState } from "react";
import { ImagePickerResponse } from 'react-native-image-picker';
import { Establecimiento, EstablecimientosResponse } from "../interfaces/appInterfaces";
import reservasApi from "../api/reservasApi";

type EstablecimientoContextProps = {
    establishments: Establecimiento[];
    loadEstablishments: () => Promise<void>;
    addEstablishments: ( adress:string, establecimientoName: string, phone: number) => Promise<Establecimiento>;
    updateEstablishments: ( adress: string, establecimientoName: string, phone: number,  establecimientoId: string) => Promise<void>;
    deleteEstablishments: ( id: string ) => Promise<void>
    loadEstablishmentPorId: (id: string) => Promise<Establecimiento>
    uploadImage: ( data: any, id: string) => Promise<void>
}
export const EstablecimientoContext = createContext({} as EstablecimientoContextProps);

export const EstablecimientoProvider = ({ children }: any) => {

    const [establishments, setEstablishments] = useState<Establecimiento[]>([])
    
    useEffect (() => {
        loadEstablishments();
    }, [])

    const loadEstablishments = async() => {
        const resp = await reservasApi.get<EstablecimientosResponse>('/establecimientos?limite=50');
        setEstablishments([ ...resp.data.establecimientos]);
        
    };

    const addEstablishments = async( adress: string, establecimientoName: string, phone: number): Promise<Establecimiento> => {
        const resp = await reservasApi.post<Establecimiento>('/establecimientos', {
            nombre: establecimientoName,
            direccion: adress,
            telefono: phone

        });
        setEstablishments([ ...establishments, resp.data]);

        return resp.data;
    };

    const updateEstablishments =async (adress:string, establecimientoName: string, phone: number, establecimientoId: string) => {
        const resp = await reservasApi.put<Establecimiento>(`/establecimientos/${ establecimientoId}`, {
            nombre: establecimientoName,
            direccion: adress,
            telefono: phone
        });
        setEstablishments( establishments.map( establecimiento => {
            return ( establecimiento._id === establecimientoId ) ? resp.data : establecimiento;
        }));
    }

    const deleteEstablishments =async (id: string) => {
        
    }

    const loadEstablishmentPorId = async(id: string): Promise<Establecimiento> => {
        const resp = await reservasApi.get<Establecimiento>(`/establecimientos/${id}`);
        return resp.data;
    }

    const uploadImage = async( data: ImagePickerResponse, id: string ) => {

        const fileToUpload = {
            uri: data.assets?.[0].uri,
            type: data.assets?.[0].type,
            name: data.assets?.[0].fileName
        }

        const formData = new FormData();
        formData.append('archivo', fileToUpload);

        try {
            
            const resp = await reservasApi.put(`/uploads/establecimientos/${ id }`, formData )
            console.log(resp);
        } catch (error) {
            console.log({ error })
        }

    }


    return(
        <EstablecimientoContext.Provider value={{
            establishments,
            loadEstablishments,
            addEstablishments,
            updateEstablishments,
            deleteEstablishments,
            loadEstablishmentPorId,
            uploadImage
        }}>
            {children}
        </EstablecimientoContext.Provider>
    )
} 
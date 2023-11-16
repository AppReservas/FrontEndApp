import React, { useEffect, useState } from "react";
import reservasApi from "../api/reservasApi";
import { Establecimiento, EstablecimientosResponse } from "../interfaces/appInterfaces"

export const useEstableciminetos = () => {
    
    const [establecimientos, setEstablecimientos] = useState<Establecimiento[]>([]);
    
    useEffect(() => {
      getEstablecimientos();
    }, [])
    
    const getEstablecimientos = async() => {
        const resp = await reservasApi.get<EstablecimientosResponse>('/establecimientos')
        setEstablecimientos( resp.data.establecimientos)
    }

    return {
        establecimientos
    }
}
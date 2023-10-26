import React, { useEffect, useState } from "react";
import reservasApi from "../api/reservasApi";
import { Categoria, CategoriasResponse } from "../interfaces/appInterfaces"

export const useCategories = () => {
    
    const [categories, setCategories] = useState<Categoria[]>([]);
    
    useEffect(() => {
      getCategories();
    }, [])
    
    const getCategories = async() => {
        const resp = await reservasApi.get<CategoriasResponse>('/categorias')
        setCategories( resp.data.categorias)
    }

    return {
        categories
    }
}
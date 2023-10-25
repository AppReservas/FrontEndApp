import React, { createContext, useEffect, useState } from "react";
import { Producto, ProductsResponse } from "../interfaces/appInterfaces";
import reservasApi from "../api/reservasApi";

type ProductContextProps = {
    products: Producto[];
    loadProducts: () => Promise<void>;
    addProduct: (categoryId:string, productName: string) => Promise<void>
    loadProductById: (id: string) => Promise<Producto>
}
export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: any) => {

    const [products, setProducts] = useState<Producto[]>([])
    
    useEffect (() => {
        loadProducts();
    }, [])

    const loadProducts = async() => {
        const resp = await reservasApi.get<ProductsResponse>('/productos?limite=50');
        // setProducts([ ...products, ...resp.data.productos]);
        setProducts([ ...resp.data.productos]);
        // console.log(resp.data.productos);
        
    };
    const addProduct = async(categoryId:string, productName: string) => {

    }
    const loadProductById = async(id: string) => {
        throw new Error('Not implemented');
    }
    return(
        <ProductContext.Provider value={{
            products,
            loadProducts,
            addProduct,
            loadProductById
        }}>
            {children}
        </ProductContext.Provider>
    )
} 
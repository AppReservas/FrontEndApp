import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { EstablecimientosScreen } from '../screens/EstablecimientosScreen';
import { ProductScreen } from '../screens/ProductScreen';


export type EstablecimientosStackParams = {
    EstablecimientosScreen: undefined,
    ProductScreen: { id?: string, name?: string }
}

const Stack = createStackNavigator();

export const EstablecimientosNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            cardStyle: {
                backgroundColor: 'white'
            },
            headerStyle: {
                elevation: 0,
                shadowColor: 'transparent'
            }
        }}
    >
        <Stack.Screen 
            name="EstablecimientosScreen"
            component={ EstablecimientosScreen }
            options={{title: 'Establecimientos'}}
        />
        <Stack.Screen 
            name="ProductScreen"
            component={ ProductScreen }
            options={{title: 'Producto'}}
        />       
    </Stack.Navigator>
  )
}

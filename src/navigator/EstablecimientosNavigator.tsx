import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { EstablecimientosScreen } from '../screens/EstablecimientosScreen';
import { EstablecimientoScreen } from '../screens/EstablecimientoScreen';
import { CampoDeportivoScreen } from '../screens/CampoDeportivoScreen';


export type EstablecimientosStackParams = {
    EstablecimientosScreen: undefined,
    EstablecimientoScreen: { id?: string, name?: string }
    CampoDeportivoScreen: { id?: string, name?: string }
    
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
            name="CampoDeportivoScreen"
            component={ CampoDeportivoScreen }
        />
        <Stack.Screen
            name="EstablecimientoScreen"
            component={ EstablecimientoScreen }
        />
    </Stack.Navigator>
  )
}

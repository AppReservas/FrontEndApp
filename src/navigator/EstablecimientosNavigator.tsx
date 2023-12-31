import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { EstablecimientosScreen } from '../screens/EstablecimientosScreen';
import { EstablecimientoScreen } from '../screens/EstablecimientoScreen';
import { CampoDeportivoScreen } from '../screens/CampoDeportivoScreen';
import { CanchasScreen } from '../screens/CanchasScreen';


export type EstablecimientosStackParams = {
    EstablecimientosScreen: undefined,
    EstablecimientoScreen: { id?: string, name?: string, adress?: string, phone?: number },
    CampoDeportivoScreen: { canchaid?: string, name?: string, sportId?: string }
    CanchasScreen: {establishmentId?: string, name?: string}

    
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
            options={{title: 'Sporty'}}
            
        />
        <Stack.Screen 
            name="CampoDeportivoScreen"
            component={ CampoDeportivoScreen }
        />
        <Stack.Screen
            name="EstablecimientoScreen"
            component={ EstablecimientoScreen }
        />
        <Stack.Screen
            name="CanchasScreen"
            component={ CanchasScreen }
        />
    </Stack.Navigator>
  )
}

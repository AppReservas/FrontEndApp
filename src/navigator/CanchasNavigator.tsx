import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
// import { EstablecimientosScreen } from '../screens/EstablecimientosScreen';
// import { EstablecimientoScreen } from '../screens/EstablecimientoScreen';
import { CampoDeportivoScreen } from '../screens/CampoDeportivoScreen';
import { CanchasScreen } from '../screens/CanchasScreen';


export type CanchasStackParams = {
    // EstablecimientosScreen: undefined,
    // EstablecimientoScreen: { id?: string, name?: string, adress?: string, phone?: number }
    CanchasScreen: undefined,
    CampoDeportivoScreen: { id?: string, name?: string }
    // CanchasScreen: { id?:string, establishmentId?: string, name: string, sportId: string, capacity: number }

    
}

const Stack = createStackNavigator();

export const CanchasNavigator = () => {
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
            name="CanchasScreen"
            component={ CanchasScreen }
        />
        {/* <Stack.Screen 
            name="EstablecimientosScreen"
            component={ EstablecimientosScreen }
            options={{title: 'Sporty'}}
            
        /> */}
        <Stack.Screen 
            name="CampoDeportivoScreen"
            component={ CampoDeportivoScreen }
        />
        {/* <Stack.Screen
            name="EstablecimientoScreen"
            component={ EstablecimientoScreen }
        /> */}
    </Stack.Navigator>
  )
}

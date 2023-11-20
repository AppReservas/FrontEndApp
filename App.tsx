import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { AuthProvider } from './src/context/AuthContext';
import { EstablecimientoProvider } from './src/context/EstablecimientosContext';
import { CanchaProvider } from './src/context/CampoDeportivoContext';

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <EstablecimientoProvider>
        {/* <CanchaProvider> */}
          {children}
        {/* </CanchaProvider>     */}
      </EstablecimientoProvider>
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />  
      </AppState>
    </NavigationContainer>
  )
}

export default App
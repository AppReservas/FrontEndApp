import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { EstablecimientosStackParams } from '../navigator/EstablecimientosNavigator';
import { ScrollView } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<EstablecimientosStackParams, 'ProductScreen'>{};

export const ProductScreen = ( {navigation, route}: Props) => {

  const { id, name = '' } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: (name) ? name : 'Cancha Nueva'
    })
  }, [])
  

  return (
    <View style={styles.container}>
        <ScrollView>
        <Text style={ styles.label}>Nombre del Escenario:</Text>
          
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop:10,
    marginHorizontal:20
  },
  label: {
    fontSize: 18
  }
})

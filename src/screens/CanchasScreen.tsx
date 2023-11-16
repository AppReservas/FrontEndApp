import React, { useContext, useEffect, useState } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { EstablecimientoContext } from '../context/EstablecimientosContext';

import { StackScreenProps } from '@react-navigation/stack';
import { EstablecimientosStackParams } from '../navigator/EstablecimientosNavigator';
import { RefreshControl } from 'react-native-gesture-handler';
import { CampoDeportivoContext } from '../context/CampoDeportivoContext';


interface Props extends StackScreenProps<EstablecimientosStackParams, 'EstablecimientosScreen'>{};

export const CanchasScreen = ({ navigation }: Props) => {

  const [ isRefreshing, setIsRefreshing ] = useState( false );
  const { canchas, loadCanchas } = useContext( CampoDeportivoContext );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginRight: 10}}
          onPress={ () => navigation.navigate('CampoDeportivoScreen', {})}
        >
          <Text>Agregar</Text>
        </TouchableOpacity>
      )
    })
  }, [])
  
  const setEstablecimientos = async() => {
    setIsRefreshing( true );
    await loadCanchas();
    setIsRefreshing( false );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}> Sporty</Text>
        <FlatList 
          data={canchas}
          keyExtractor={ (p) => p._id }
          renderItem={ ({item, index}) => (
            <View key={index} style={styles.establecimiento}> 
            <TouchableOpacity           
            activeOpacity={0.8}
            onPress={ 
              () => navigation.navigate('CampoDeportivoScreen', {
                id: item._id,
                name: item.nombre
              })
            }
            >
              {/* <Image source={require('item.img')} style={styles.image} /> */}
              <Text style={styles.title}>{item.nombre}</Text>
            </TouchableOpacity>
            </View>
            
          )}

          refreshControl={
            <RefreshControl 
              refreshing= { isRefreshing }
              onRefresh={ setEstablecimientos }
            />
          }
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20
  },
  logo: {
    color: '#fff',
    fontSize:24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  establecimiento: {
    backgroundColor: '#333',
    padding: 20,
    marginBottom: 20
  },
  image: {
    width:'100%',
    height: 200,
    marginBottom: 20
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  premium: {
    color: '#fff',
    fontSize: 16
  }
})

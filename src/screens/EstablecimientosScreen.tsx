import React, { useContext, useEffect } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { ProductContext } from '../context/ProductContext';

import { StackScreenProps } from '@react-navigation/stack';
import { EstablecimientosStackParams } from '../navigator/EstablecimientosNavigator';

interface Props extends StackScreenProps<EstablecimientosStackParams, 'EstablecimientosScreen'>{};

export const EstablecimientosScreen = ({ navigation }: Props) => {

  const { products } = useContext( ProductContext );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
        >

        </TouchableOpacity>
      )
    })
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.logo}> Sporty</Text>
        <FlatList 
          data={products}
          keyExtractor={ (p) => p._id }
          renderItem={ ({item, index}) => (
            <View key={index} style={styles.establecimiento}> 
            <TouchableOpacity           
            activeOpacity={0.8}
            onPress={ 
              () => navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre
              })
            }
            >
              <Image source={require('item.img')} style={styles.image} />
              <Text style={styles.title}>{item.nombre}</Text>
            </TouchableOpacity>
            </View>
            
          )}
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

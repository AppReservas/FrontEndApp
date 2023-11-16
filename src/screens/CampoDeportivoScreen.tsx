import React, { useEffect, useContext } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Image } from 'react-native';

import { Picker } from '@react-native-picker/picker'

import { StackScreenProps } from '@react-navigation/stack';
import { EstablecimientosStackParams } from '../navigator/EstablecimientosNavigator';
import { useEstableciminetos } from '../hooks/useEstablecimientos';
import { useForm } from '../hooks/useForm';
import { CampoDeportivoContext } from '../context/CampoDeportivoContext';

interface Props extends StackScreenProps<EstablecimientosStackParams, 'CampoDeportivoScreen'>{};

export const CampoDeportivoScreen = ( {navigation, route}: Props) => {

  const { id = '', name = '' } = route.params;

  const { establecimientos } = useEstableciminetos();
  const { loadCanchaPorId, addCancha, updateCancha } = useContext(CampoDeportivoContext);

  const { _id, establecimientoId, nombre, img, form, onChange, setFormValue } = useForm({
    _id: id,
    establecimientoId: '',
    nombre: name,
    img: ''
  })

  useEffect(() => {
    navigation.setOptions({
      title: (name) ? name : 'Cancha Nueva'
    })
  }, [nombre])

  useEffect(() => {
    loadCancha();
  }, [])

  const loadCancha = async() => {
    if (id.length === 0 ) return;
    const cancha = await loadCanchaPorId( id );
    setFormValue({
      _id: id,
      establecimientoId: cancha.establecimiento._id,
      img: cancha.img || '',
      nombre
    })
  }
  
  const saveOrUpdate = async() => {
    if(id.length > 0) {
      updateCancha( establecimientoId, nombre, id );
    } else {
      const tempEstablecimientoId = establecimientoId || establecimientos[0]._id;
      const newCancha = await addCancha(tempEstablecimientoId, nombre);
      onChange( newCancha._id, '_id');
    }
  }

  return (
    <View style={styles.container}>
        <ScrollView>
          
          <Text style={ styles.label}>Nombre del Escenario:</Text>
          <TextInput 
            placeholder='Cancha'
            style={styles.textInput}
            value={ nombre}
            onChangeText={ (value) => onChange(value, 'nombre')}
          />

          <Text style={styles.label}>Establecimiento:</Text>
          <Picker
            selectedValue={ establecimientoId}
            onValueChange={ (value) => onChange( value, 'establecimientoId')}
          >
            {
              establecimientos.map( e => (
                <Picker.Item
                  label={ e.nombre }
                  value={ e._id }
                  key={ e._id }
                />
              ))
            }
          </Picker>

          <Button
            title='Guardar'
            onPress={ saveOrUpdate }
            color="#5856D6"
          />

          {
            ( _id.length > 0 ) && (
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                <Button
                  title='Cámara'
                  onPress={ () => {}}
                  color="#5856D6"
                />

              <View style={{ width: 10 }} />

              <Button 
                  title="Galería"
                  // TODO: Por hacer
                  onPress={ ()=> {  }}
                  color="#5856D6"
              />
              </View>
            )
          }

          {
            (img.length > 0) && (
              <Image
                source={{ uri: img}}
                style={{
                  marginTop: 20,
                  width: '100%',
                  height: 300
                }}
              />
            )
          }
        
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
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 15
  }
})

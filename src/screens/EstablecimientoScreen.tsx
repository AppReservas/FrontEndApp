import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Image } from 'react-native';

import { launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { StackScreenProps } from '@react-navigation/stack';
import { EstablecimientosStackParams } from '../navigator/EstablecimientosNavigator';

import { useForm } from '../hooks/useForm';
import { EstablecimientoContext } from '../context/EstablecimientosContext';

interface Props extends StackScreenProps<EstablecimientosStackParams, 'EstablecimientoScreen'>{};

export const EstablecimientoScreen = ( {navigation, route}: Props) => {

  const { id = '', name = '', adress = '', phone = 0 } = route.params;

  const [ tempUri, setTempUri ] = useState<string>()

  const { loadEstablishmentPorId, addEstablishments, updateEstablishments, uploadImage } = useContext(EstablecimientoContext);

  const { _id, direccion, telefono, nombre, img, form, onChange, setFormValue } = useForm({
    _id: id,
    direccion: adress,
    nombre: name,
    img: '',
    telefono: phone
  })


  useEffect(() => {
    navigation.setOptions({
      title: (name) ? name : 'Establecimiento Nuevo'
    })
  }, [nombre])

  useEffect(() => {
    loadEstablecimiento();
  }, [])

  const loadEstablecimiento = async() => {
    if (id.length === 0 ) return;
    const establishments = await loadEstablishmentPorId( id );
    setFormValue({
      _id: id,
      direccion,
      telefono,
      img: establishments.img || '',
      nombre
    })
  }
  
  const saveOrUpdate = async() => {
    if(id.length > 0) {
      updateEstablishments( direccion, nombre, telefono, id );
    } else {
      const newEstablecimiento = await addEstablishments(direccion, nombre, telefono);
      onChange( newEstablecimiento._id, '_id');
    }
  }

  const takePhoto = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5,
    }, (resp) => {
      if( resp.didCancel) return;
      if( !resp.assets?.[0].uri ) return;

      setTempUri (resp.assets?.[0].uri);
      uploadImage( resp, _id)
    });
  }

  const takePhotoFromGallery = () => {
    launchImageLibrary({
      mediaType:'photo',
      quality: 0.5,
    }, ( resp) => {
      if( resp.didCancel) return;
      if( !resp.assets?.[0].uri) return;

      setTempUri( resp.assets?.[0].uri);
      uploadImage( resp, _id)
    })
  }

  return (
    <View style={styles.container}>
        <ScrollView>
          
          <Text style={ styles.label}>Nombre del Establecimiento:</Text>
          <TextInput 
            placeholder='Ingrese el nombre del establecimiento'
            style={styles.textInput}
            value={ nombre }
            onChangeText={ (value) => onChange(value, 'nombre')}
          />

          <Text style={ styles.label}>Dirección del Establecimiento:</Text>
          <TextInput 
            placeholder='Ingrese la dirección'
            style={styles.textInput}
            value={ direccion }
            onChangeText={ (value) => onChange(value, 'direccion')}
          />

          <Text style={ styles.label}>Telefono del Establecimiento:</Text>
          <TextInput 
            placeholder='Ingrese el telefono'
            style={styles.textInput}
            keyboardType='numeric'
            value={ telefono }
            onChangeText={ (value) => onChange(value, 'telefono')}
          />
         

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
                  onPress={ takePhoto }
                  color="#5856D6"
                />

              <View style={{ width: 10 }} />

              <Button 
                  title="Galería"
                  // TODO: Por hacer
                  onPress={ takePhotoFromGallery}
                  color="#5856D6"
              />
              </View>
            )
          }

          {
            (img.length > 0 && !tempUri ) && ( 
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

          {
            ( tempUri ) && (
              <Image
                source={{uri:tempUri}}
                style={{
                  marginTop:20,
                  width:'100%',
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

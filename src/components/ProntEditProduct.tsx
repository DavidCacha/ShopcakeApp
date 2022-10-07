import React, { useState } from 'react'
import {  TouchableOpacity, View, Alert, ActivityIndicator, Text, Modal, StyleSheet } from 'react-native';
import prompt from 'react-native-prompt-android';
import Icon from 'react-native-vector-icons/Ionicons'
import { useProfile } from '../hooks/useProfile';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from '../hooks/useProducts';

interface Props{
    title: string,
    params: string,
    text: string,
    datos: any,
    updateQuery: any,
}

export const ProntEditProduct = ({title, text, datos, params, updateQuery}:Props) => {


   const navigation = useNavigation();

   const [modalVisible, setModalVisible] = useState(false);

   const {ProductUpdate , loadProducts} = useProducts();

   function newProfile (dato:string)  {
    console.log(datos)
    delete datos[params]
    datos[params] = dato
    ProductUpdate(datos);
   }

  

   function redireccion(){
    setModalVisible(false);
    loadProducts();
    updateQuery();
   }
   const updateDate = (dato:string) => {
    setModalVisible(true)
    newProfile(dato);
    setTimeout(redireccion,3500);
    
   }

    const showAlert = () => {
        prompt(
            title,
            text,
            [
             {text: 'Cancelar', onPress: () =>  console.log('profile'), style: 'cancel'},
             {text: 'Actualizar', onPress: dato => updateDate(dato)},
            ],
            {
                type: 'default',
                defaultValue: '',
                placeholder: ''
            }
        )
      }

    
  return (
        <>  
                    <TouchableOpacity  onPress={showAlert}>                  
                        <Icon  name='pencil-outline' size={25} color='#850642'/> 
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ActivityIndicator size="large" color="#850642" />
                            <Text style={{color:'#850642'}}>Actualizando {params}</Text>
                        </View>
                        </View>
                    </Modal>
        </>
       
  )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
        backgroundColor:'rgba(0,0,0,0.8)',
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.85,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
  




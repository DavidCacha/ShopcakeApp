import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Keyboard, Pressable, ActivityIndicator, Modal } from 'react-native';
import { useForm } from '../hooks/useForm';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { useProducts } from '../hooks/useProducts';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props{
    refresh:any,
    modal:any
}

export const AddProduct = ({refresh, modal}:Props) => {
    const [categoria, setCategoria] = useState('');

    const [saveImage, setSaveImage] = useState();
    const {saveProducts} = useProducts();
    const [modalVisible, setModalVisible] = useState(false);


    const {form, onChange, nombreProducto, ingrediente, precioProducto, saborProducto,  datosProducto, pesoProducto, capacidadProducto} = useForm({
       nombreProducto:'',
       ingrediente:'',
       precioProducto:'',
       saborProducto:'',
       
       datosProducto:'',
       pesoProducto:'', 
       capacidadProducto:''
      });

      const UpPhoto = () => {
        launchImageLibrary({
          mediaType:'photo',
          quality:0.5
        }, (resp:any)=>{
          if(resp.didCancel)  return;
          if(!resp.assets[0].uri) return;
          setSaveImage(resp);
        });
       
      }

      function timeIndicator(){
        setModalVisible(false);        
        refresh();
        modal();
      }
      const onRegister = () => {
        Keyboard.dismiss();
        var newProduct={
            nombre: nombreProducto,
            ingredientes: ingrediente,
            sabores: saborProducto,
            categoria:categoria,
            datos: datosProducto,
            peso: pesoProducto,
            capacidad: capacidadProducto,
            precio: precioProducto
        }
        saveProducts(newProduct, saveImage);
        setModalVisible(true);
        setTimeout(timeIndicator,3500);
       
        
        
      }    
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{}}>
        <Text style={styles.subTitle}>Agregar imagen del producto:
        <TouchableOpacity onPress={UpPhoto}> 
            <Icon name='image-outline' color='#850642' size={25}/>
        </TouchableOpacity>
        </Text>
        <Text style={{color:'#850842',fontSize:20, width: '100%'}}></Text>
        </View>
        <Text style={styles.subTitle}>Nombre del producto:</Text>
            <TextInput                
                        underlineColorAndroid='#850842'
                        placeholder='Ingrese su nombre del producto'
                        placeholderTextColor='#850842'
                        keyboardType='default'                        
                        selectionColor="#850842"
                        autoCapitalize='none'
                        autoCorrect={false}        
                        
                        style={{color:'#850842',fontSize:20, width: '100%',
                                borderColor:'#850842'
                            
                            }}
                        onChangeText={(value)=> onChange(value, 'nombreProducto')}
                        value={nombreProducto}
                        onSubmitEditing={onRegister}
            />
            <Text style={styles.subTitle}>Capacidad:</Text>
            <TextInput                
                        underlineColorAndroid='#850842'
                        placeholder='Ingrese la capacidad en piezas'
                        placeholderTextColor='#850842'
                        keyboardType='default'
                        selectionColor="#850842"
                        autoCapitalize='none'
                        autoCorrect={false}        
                        
                        style={{color:'#850842',fontSize:20, width: '100%',
                                borderColor:'#850842'
                            
                            }}
                        onChangeText={(value)=> onChange(value, 'capacidadProducto')}
                        value={capacidadProducto}
                        onSubmitEditing={onRegister}
            />
            <Text style={{...styles.subTitle}}>Peso:</Text>
            <TextInput                
                        onSubmitEditing={onRegister}
                        underlineColorAndroid='#850842'
                        placeholder='Ingrese peso en Kg'
                        placeholderTextColor='#850842'
                        selectionColor="#000"
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={{color:'#850842',fontSize:18, width: '100%', 
                                borderColor:'#850842'
                            
                            }}
                        onChangeText={(value)=> onChange(value, 'pesoProducto')}
                        value={pesoProducto}
            />
            <Text style={{...styles.subTitle}}>Categoria:</Text>
            <View style={{height:50, width:'100%', marginTop:8}}>
              <Picker
                style={{backgroundColor:'#850842', color:'white'}}
                dropdownIconColor='white'
                selectedValue={categoria}
                onValueChange={(itemValue, itemIndex) =>
                  setCategoria(itemValue)
                }>
                <Picker.Item    label="Selecciona una categoria" value={null} />
                <Picker.Item   label="Reposteria" value={'Reposteria'}  />
                <Picker.Item  label="Pasteleria" value={'Pasteleria'} />
                <Picker.Item  label="Panaderia" value={'Panaderia'} />

              </Picker>
            </View>
            <Text style={{...styles.subTitle, marginTop:10}}>Ingredientes:</Text>
            <TextInput                
                        onSubmitEditing={onRegister}
                        underlineColorAndroid='#850842'
                        placeholder='Ingrese los ingredientes del producto'
                        placeholderTextColor='#850842'
                        selectionColor="#000"
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={{color:'#850842',fontSize:18, width: '100%', 
                                borderColor:'#850842'
                            
                            }}
                        onChangeText={(value)=> onChange(value, 'ingrediente')}
                        value={ingrediente}
            />
             <Text style={{...styles.subTitle}}>Sabores:</Text>
            <TextInput                
                        onSubmitEditing={onRegister}
                        underlineColorAndroid='#850842'
                        placeholder='Ingrese los sabores que se tienen'
                        placeholderTextColor='#850842'
                        selectionColor="#000"
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={{color:'#850842',fontSize:18, width: '100%', 
                                borderColor:'#850842'
                            
                            }}
                        onChangeText={(value)=> onChange(value, 'saborProducto')}
                        value={saborProducto}
            />
            <Text style={{...styles.subTitle}}>Datos:</Text>
            <TextInput                
                        onSubmitEditing={onRegister}
                        underlineColorAndroid='#850842'
                        placeholder='Ingrese los sabores que se tienen'
                        placeholderTextColor='#850842'
                        selectionColor="#000"
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={{color:'#850842',fontSize:18, width: '100%', 
                                borderColor:'#850842'
                            
                            }}
                        onChangeText={(value)=> onChange(value, 'datosProducto')}
                        value={datosProducto}
            />
                <Text style={{...styles.subTitle}}>Precio:</Text>
            <TextInput                
                        onSubmitEditing={onRegister}
                        underlineColorAndroid='#850842'
                        placeholder='Ingrese los sabores que se tienen'
                        placeholderTextColor='#850842'
                        selectionColor="#000"
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={{color:'#850842',fontSize:18, width: '100%', 
                                borderColor:'#850842'
                            
                            }}
                        onChangeText={(value)=> onChange(value, 'precioProducto')}
                        value={precioProducto}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={onRegister}
              //onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Guardar registro</Text>
            </TouchableOpacity>
            <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ActivityIndicator size="large" color="#850642" />
                            <Text style={{color:'#850642'}}>Actualizando imagen</Text>
                        </View>
                        </View>
                    </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    tempIndicator:{
        top: 100,
        left:35, 
        paddingVertical:50,  
        zIndex:999, 
        position:'absolute', 
        width:'80%', 
        justifyContent:'center', 
        alignItems:'center',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonClose: {
        backgroundColor: "#850642",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
    subTitle:{
        fontSize:20,
        fontWeight:'400',
        color:'black'
    },
    container:{
        width:'100%'
    }
});
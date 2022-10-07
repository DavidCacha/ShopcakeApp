import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Keyboard, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { Products } from '../interfaces/appIterfaces';
import { FadeInImage } from '../hooks/FadeImage';
import { AuthContext } from '../context/AuthContext';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { ProntEditProduct } from './ProntEditProduct';
import { ScrollView } from 'react-native-gesture-handler';
import { useProducts } from '../hooks/useProducts';
import { useForm } from '../hooks/useForm';
interface Props{
    producto: Products;
    id:string
    image: string,
    nombre: string,
    refresh: any
}

export const ProductsAllAdmin = ({nombre, image, refresh, id}:Props) => {

const [modalVisible, setModalVisible] = useState(false);

const [stringModal, setStringModal] = useState('');

const [viewIconImage, setViewIcon] = useState(false)

const [tempUri, setTempUri] = useState<string>();

const {uploadImageProduct,productoID, deleteProduct, getProductById} = useProducts();


const [ViewProduct, setViewProduct] = useState(false);


const getProduct = () => {
    setViewProduct(true)
    getProductById(id);
}

useEffect(()=>{
    getProductById(id);
    setViewIcon(false)
},[]);

const updateQueryById = () => {
    getProductById(id);
}

const closeModal = () =>{
    setModalVisible(false)
}
const {img} = useForm({
    
    img:''
  });

function redireccion(){
    setModalVisible(false);
    refresh();
   }

const UpPhoto = () => {
    setViewIcon(true)
    launchImageLibrary({
      mediaType:'photo',
      quality:0.5
    }, (resp:any)=>{
      if(resp.didCancel)  return;
      if(!resp.assets[0].uri) return;
      setTempUri(resp.assets[0].uri);
      uploadImageProduct(resp, id);
      setStringModal('Actualizando imagen')
      setModalVisible(true);
      setTimeout(redireccion, 3500);
    });
   
  }

const deleteProducto = () => {
    setModalVisible(true);
    setStringModal('Eliminando producto');    
    deleteProduct(id)
    setTimeout(redireccion, 3500);
}

  return (
    <View style={styles.ViewFirst}>
        
        <TouchableOpacity onPress={ getProduct} style={{justifyContent:'center', alignItems:'center', marginBottom:-10, marginLeft:-15}}>
        <View >
            <Text style={{...styles.text,fontWeight:'500', textAlign:'center'  }}>{nombre}</Text>
        </View>
        {
            image === null ? (
                <Image style={{width:140, height:140 ,marginTop:0, marginLeft:0}} source={require('../assets/img_default.jpg') }/>

            ) : (
                <FadeInImage uri={ `http://10.0.2.2:4444/api/product_image/${image}`} style={{
                    width:180, height:160, marginTop:0, marginLeft:0, marginBottom:8
                }}/>
            )
                }
        </TouchableOpacity>       
        <Modal
        animationType='slide'
        visible={ViewProduct}
        transparent={true}
        >
            <View style={{
                flex:1,
                backgroundColor:'rgba(0,0,0,0.8)',
                justifyContent:'center',
                alignItems:'center'
            }}>
                <View style={{
                    width:400,
                    height:650,
                    padding:15,
                    backgroundColor:'white',
                    shadowOffset:{
                        width:0,
                        height:10
                    },
                    shadowOpacity:0.55,
                    elevation:10,
                    borderRadius:20                
                }}>
                <View style={{ alignItems:'center' , justifyContent:'center'}}>
                            <TouchableOpacity  style={styles.close} onPress={() => {setViewProduct(false), setViewIcon(false)}}>                            
                                    <Icon name='close-outline' size={45} color='white'/> 
                            </TouchableOpacity>
                        
                        <View style={{flexDirection:'row-reverse',  justifyContent:'space-between'}}>
                                <Text style={{fontSize:25,fontWeight:'bold', marginBottom:15, color: '#850842'}}> {productoID?.nombre}</Text>
                                <ProntEditProduct updateQuery={updateQueryById} params='nombre' datos={productoID} title='Actuliza el nombre del producto' text='Agrega nuevo nombre del producto.'/> 

                        </View>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{width:'100%', justifyContent:'center', backgroundColor:'white', alignItems:'center', marginBottom:-90}}>
                      
                                
                                <TouchableOpacity  style={styles.camera} onPress={UpPhoto}>                            
                                    <Icon name='image-outline' style={{padding:10}} size={35} color='white'/> 
                                </TouchableOpacity>                    
                        
                       

                            {
                                (tempUri) ? (
                                    <Image 
                                        source={{ uri: tempUri }}
                                        style={{
                                            marginTop: 20,
                                            width: '50%',
                                            height: 200
                                        }}
                                    />
                                ): (
                                        !productoID?.image === null ? (
                                            <Image style={{width:150, height:150}} source={require('../assets/img_default.jpg') }/>
        
                                        ) : (
                                            <FadeInImage uri={ `http://10.0.2.2:4444/api/product_image/${productoID?.image}`} style={{
                                                width:180, height:160
                                            }}/>
                                        )
                                    
                                )
                            }
                           
                    </View>
                    <View style={{marginTop:110}}>
                            <View style={{flexDirection:'row-reverse',  justifyContent:'space-between'}}>
                                <ProntEditProduct  updateQuery={updateQueryById} params='capacidad' datos={productoID} title='Actuliza la capacidad del producto' text='Agrega la capacidad del producto.'/> 
                                <Text style={styles.textTitle}>Capacidad</Text>
                            </View>
                             <Text style={styles.subTitle}>{productoID?.capacidad}</Text>
                    </View>
                    <View style={{marginTop:10}}>
                            <View style={{flexDirection:'row-reverse',  justifyContent:'space-between'}}>
                                <ProntEditProduct updateQuery={updateQueryById} params='categoria' datos={productoID} title='Actuliza la categoria del producto' text='Agrega la categoria del prodcuto.'/> 
                                <Text style={styles.textTitle}>Categoria</Text>
                            </View>
                             <Text style={styles.subTitle}>{productoID?.categoria}</Text>
                    </View>
                    <View style={{marginTop:10}}>
                            <View style={{flexDirection:'row-reverse',  justifyContent:'space-between'}}>
                                <ProntEditProduct  updateQuery={updateQueryById} params='peso' datos={productoID} title='Actuliza el peso del producto.' text='Ingresa el asignado del producto.'/> 
                                <Text style={styles.textTitle}>Peso</Text>
                            </View>
                             <Text style={styles.subTitle}>{productoID?.peso}</Text>
                    </View>
                    <View style={{marginTop:10}}>
                            <View style={{flexDirection:'row-reverse',  justifyContent:'space-between'}}>
                                <ProntEditProduct  updateQuery={updateQueryById} params='precio' datos={productoID} title='Actuliza el precio del producto' text='Ingresa el precio del producto.'/> 
                                <Text style={styles.textTitle}>Precio</Text>
                            </View>
                             <Text style={styles.subTitle}>{productoID?.precio}</Text>
                    </View>
                    <View style={{marginTop:10}}>
                            <View style={{flexDirection:'row-reverse',  justifyContent:'space-between'}}>
                                <ProntEditProduct updateQuery={updateQueryById} params='sabores' datos={productoID} title='Actuliza los dabores del producto' text='Ingresa el sabor que se tiene  del producto'/> 
                                <Text style={styles.textTitle}>Sabores</Text>
                            </View>
                             <Text style={styles.subTitle}>{productoID?.sabores}</Text>
                    </View>
                    <View style={{marginTop:10}}>
                            <View style={{flexDirection:'row-reverse',  justifyContent:'space-between'}}>
                                <ProntEditProduct  updateQuery={updateQueryById} params='ingredientes' datos={productoID} title='Actuliza los ingredientes del producto' text='Ingresa los ingredientes con los que esta hecgo el producto'/> 
                                <Text style={styles.textTitle}>Ingredientes</Text>
                            </View>
                             <Text style={styles.subTitle}>{productoID?.ingredientes}</Text>
                    </View>
                    <View style={{marginTop:10}}>
                            <View style={{flexDirection:'row-reverse',  justifyContent:'space-between'}}>
                                <ProntEditProduct updateQuery={updateQueryById} params='datos' datos={productoID} title='Agrega datos del interes sobre el producto' text='Ingresa datos adicionales del producto.'/> 
                                <Text style={styles.textTitle}>Datos adicionales</Text>
                            </View>
                             <Text style={styles.subTitle}>{productoID?.datos}</Text>
                    </View>
                    <View style={{width:'100%', marginBottom:15, height:45, justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity onPress={ deleteProducto} style={{marginTop:10,backgroundColor:'#850642'}}>
                           <Text style={{color:'white', padding:5, fontSize:18}}> Eliminar producto</Text>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                </View>
            </View>
               
        </Modal>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            >
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <ActivityIndicator size="large" color="#850642" />
                <Text style={{color:'#850642', marginTop:15}}>{stringModal}</Text>
            </View>
            </View>
        </Modal>
    </View>

    
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
    camera:{
        position:'absolute',
        left:0,
        backgroundColor:'#850642',
        borderRadius:25,
        
    },
    textTitle:{
        fontSize:20,
        fontWeight:'500',
        color:'#850842'
      },
    subTitle:{
        fontSize:18,
        fontWeight:'400',
        color:'black'
    },
    close:{
        position:'absolute',
        right:-15,
        backgroundColor:'#850642',
        borderRadius:25,
        top:-20
    },
    textTitleStatus:{
        justifyContent:'center',
        fontWeight:'300', 
        color: '#850842',
        fontSize:18,
        alignItems:'center'
      },
    parrafoText:{
        fontSize: 20,
        fontWeight: '400',
        textAlign:'justify',
        width:'100%'
      },
    
    text:{
        fontSize:18,
        color:'#850842',

    },    
    image:{
        height:200,

        width:'100%'
    },
    ViewFirst:{
        marginTop:-6,
        paddingHorizontal:10,
        marginVertical:15,
        width:'50%',
        
    }
});

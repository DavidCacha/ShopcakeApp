import React, { useContext, useState } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Keyboard } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useForm } from '../hooks/useForm';
import { Products } from '../interfaces/appIterfaces';
import { FadeInImage } from '../hooks/FadeImage';
import { AuthContext } from '../context/AuthContext';
import { useSales } from '../hooks/useSales';
import { useProfile } from '../hooks/useProfile';
import { useNavigation } from '@react-navigation/native';
interface Props{
    producto: Products;
}

export const ProductsAllUser = ({producto}:Props) => {

const navigation = useNavigation();

const {user} = useContext(AuthContext);

const {profile} = useProfile(user?.nombre);

const {saveSaleUser} = useSales();

const [ViewProduct, setViewProduct] = useState(false);

const {cantidadProduct, onChange} = useForm({
    cantidadProduct:'1',
});

var precioCantidad = parseInt(cantidadProduct);
var precioCliente = parseInt(producto.precio);



var solicitante = user?.nombre;
var id_solicitante = profile._id;
var producto_nombre = producto._id;
var cantidad = precioCantidad.toString();
var telefono = producto.precio.toString();
var datos = "En proceso de pago";
var estado = "null";
var total = (precioCantidad * precioCliente).toString();

const sale = {
    solicitante,
    producto_nombre,
    cantidad,
    id_solicitante,
    telefono,
    datos,
    estado,
    total
}

const onPrice = () => {
    Keyboard.dismiss();    
  }

const saveSale = () => {
    saveSaleUser(sale);
    setViewProduct(false);
}
  return (
    <View style={styles.ViewFirst}>
        <View style={{justifyContent:'center', alignItems:'center', marginBottom:18, marginLeft:-15}}>
        {
            producto.image === null ? (
                <Image style={{width:150, height:150 ,marginTop:0, marginLeft:0}} source={require('../assets/img_default.jpg') }/>

            ) : (
                <FadeInImage uri={ `http://10.0.2.2:4444/api/product_image/${producto.image}`} style={{
                    width:180, height:160, marginTop:0, marginLeft:0, marginBottom:8
                }}/>
            )
                }
        </View>
        <View style={{marginTop:-20}}>
            <Text style={{...styles.text, }}>{producto.nombre}</Text>
            <Text style={{...styles.text, fontSize:15, color:'black' }}>Precio: ${producto.precio} MXN</Text>
            <TouchableOpacity onPress={()=> setViewProduct(true)}>
                <Text style={{...styles.text, fontWeight:'bold' }}>Ver detalles</Text>
            </TouchableOpacity>
        </View>

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
                    height:420,
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
                        <TouchableOpacity style={styles.close} onPress={() => setViewProduct(false)}>                            
                             <Icon name='close-outline' size={45} color='#850642'/> 
                        </TouchableOpacity>
                      <Text style={{fontSize:25,fontWeight:'bold', marginBottom:15, color: '#850842'}}>{producto.nombre}</Text>
                    </View>
                    <View style={{width:'100%', marginBottom:-90}}>
                        <View style={{width:'100%', flexDirection:'row', height:200}}>
                            <View style={{width:'60%'}}>                                
                                <Text style={{...styles.text, color:'grey', fontWeight:'500'}}>Sabores: {producto.sabores}</Text> 
                                <Text style={{...styles.text, color:'grey', fontWeight:'500'}}>Peso: {producto.peso} Kg</Text> 
                                <Text style={{...styles.text, color:'grey', fontWeight:'500'}}>Categoria: {producto.categoria}</Text>
                                <Text style={{...styles.text, color:'grey', fontWeight:'500'}}>Precio: ${producto.precio} MXN</Text>

                            </View> 
                            {
                                !producto.image === null ? (
                                    <Image style={{width:150, height:150}} source={require('../assets/img_default.jpg') }/>

                                ) : (
                                    <FadeInImage uri={ `http://10.0.2.2:4444/api/product_image/${producto.image}`} style={{
                                        width:180, height:160, marginTop:0, marginLeft:-25
                                    }}/>
                                )
                            }
                        </View>
                    </View>
                    <Text style={{...styles.textTitleStatus, fontSize:25, fontWeight:'400', marginTop:8}}>Ingredientes</Text> 
                    <View style={{ width:'100%', height:60, marginBottom:8}}>
                        <Text style={styles.parrafoText}>{producto.ingredientes}</Text>
                    </View>
                    <View  style={{flexDirection:'column', marginTop:0}}>
                       <View style={{flexDirection:'row', marginLeft:-38}}>
                       <Text style={{fontSize:17, marginLeft:40}}>Unidad(es) </Text>
                        <TextInput                
                        
                        placeholder='1'
                        placeholderTextColor='#850842'
                        keyboardType='number-pad'
                        selectionColor="#850842"
                        autoCapitalize='none'
                        autoCorrect={false}        
                        
                        style={{marginTop:-15, fontSize:20}}
                        onChangeText={(value)=> onChange(value, 'cantidadProduct')}
                        value={cantidadProduct}
                        onSubmitEditing={onPrice}
            />
                       </View>
                       <Text style={{fontSize:19, fontWeight:'bold', color:'#850642'}}>Total a pagar: ${precioCliente * precioCantidad} MXN</Text>
                    </View>
                    <TouchableOpacity
                    style={{...styles.makeBuy, flexDirection:'row',marginTop:15, justifyContent:'center', alignItems:'center'}}
                    onPress={saveSale}
                    >
                      <Icon name='cart-outline' size={30} style={{marginRight:-0}} color='white'/>
                      <Text style={{...styles.text, color: 'white', padding:8 , fontSize:18, fontWeight:'bold'}}>
                        Agregar a carrito
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>

    
  )
}

const styles = StyleSheet.create({
    close:{
        position:'absolute',
        right:-10
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
    makeBuy:{
        backgroundColor:'#850842',
        borderRadius:15,
        color: 'white', 
        fontSize:19, 
        padding:4
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
        backgroundColor:'white', 
        paddingHorizontal:10,
        marginVertical:45,
        width:'50%',
    }
});

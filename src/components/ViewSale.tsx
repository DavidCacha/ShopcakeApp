import React, { useEffect, useState } from 'react'
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSales } from '../hooks/useSales';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from '../hooks/useProducts';

interface Props{
  refreshData?:any;
    sale: any;
}
export const ViewSale = ({refreshData,sale}:Props) => {

  const navigation = useNavigation();
  const {updateSaleUser, deleteSale} = useSales();
  const [timeIndicator, setTimeIndicator] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [deleteVisible, setdeleteVisible] = useState(false);
  const {getProductById, productoID} = useProducts();

  useEffect(()=>{
    getProductById(sale.producto_nombre);
  },[])

  var id = sale._id;
  var solicitante = sale.solicitante;
  var producto_nombre = sale.producto_nombre;
  var cantidad = sale.cantidad;
  var telefono = sale.telefono;
  var datos = "Pagado";
  var estado = "Preparando";
  var total = sale.total;

  const saleObject = {
    id,
      solicitante,
      producto_nombre,
      cantidad,
      telefono,
      datos,
      estado,
      total
  }

  function timeSale(){
    setTimeIndicator(false);
    setdeleteVisible(false)
    //navigation.navigate('Productosuse')
  }

  const updateSale = () => {
    //refreshData();
    setIsVisible(false)
    updateSaleUser(saleObject, id);
  }

  const deleteProductSale = () =>{
      deleteSale(sale._id)
      setTimeIndicator(true);
      setTimeout(timeSale, 3000);

  }

  return (
    <View style={{paddingHorizontal:25, marginTop:15 ,width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
     <> 
      
     {
      sale.datos !== 'Pagado' && (
        <TouchableOpacity style={styles.delete} onPress={() =>(setdeleteVisible(true))}>                            
                             <Icon name='close-outline' size={35} color='white'/> 
        </TouchableOpacity>
      )
     }
     <View style={{marginTop:-3}}>              
              <Text style={styles.text}>{productoID?.nombre}</Text>
              <View >
              <Text style={{...styles.text, fontWeight:'bold', fontSize:15}}>Estatus de pago:  </Text>
              <Text style={{...styles.text, fontSize:15, color:'black'}}>{sale.datos}</Text>
              </View>
            </View>
            <View style={{justifyContent:'flex-end',marginLeft:-185, marginTop:20, alignItems:'flex-end'}}>
              <Text style={{...styles.text, fontWeight:'bold', marginTop:3, fontSize:17, marginBottom:1}}>Total a pagar: ${sale.total} MXN</Text>
              {
                sale.datos === 'En proceso de pago' ? (
                    <TouchableOpacity 
                    style={styles.makeBuy}
                    onPress={()=>(setIsVisible(true))}
                    >
                        <Text style={{...styles.makeBuy, paddingVertical:3, paddingHorizontal:5}}>Realizar pago</Text>
                    </TouchableOpacity>
                ) : 
                (
                    <View>
                        <Text style={{...styles.text, fontSize:19, color:'black', fontWeight:'300'}}>Estatus: {sale.estado}</Text>
                    </View>
                )
              }
            </View>
      </>
    
    <Modal
        animationType='slide'
        visible={isVisible}
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
                    height:450,
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
                      
                    <TouchableOpacity style={styles.close} onPress={() => setIsVisible(false)}>                            
                             <Icon name='close-outline' size={45} color='#850642'/> 
                        </TouchableOpacity>
                      <Text style={{fontSize:25,fontWeight:'bold', marginBottom:15}}>Realizar pago</Text>
                    </View>
                    <Text style={{textAlign:'center', color:'#850642', fontSize:25, fontWeight:'bold', marginBottom:5}}>{sale.producto_nombre}</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontSize:20, color:'#850642',fontWeight:'bold'}}>Total a pagar: ${sale.total} MXN</Text>
                      <Text style={{fontSize:20, fontWeight:'300',color:'#850642'}}>Cantidad: {sale.cantidad}</Text>
                    </View>     
                    <Text style={{fontSize:20, fontWeight:'300',color:'#850642',marginBottom:5}}>Precio de producto ${sale.telefono} MXN</Text>
                    <Text style={{fontSize:20, fontWeight:'300'}}>Numero de tarjeta:</Text>
                    <TextInput                
                        underlineColorAndroid='#850842'
                        placeholder='Ingrese su numero de tarjeta'
                        placeholderTextColor='#850842'
                        keyboardType='numeric'
                        selectionColor="#850842"
                        autoCapitalize='none'
                        autoCorrect={false}        
                        
                        style={{color:'#850842',fontSize:20, width: '100%',
                                borderColor:'#850842', borderStyle:'solid',borderRadius:12
                            
                            }}
                        //onChangeText={(value)=> onChange(value, 'email')}
                        //value={email}
                        //onSubmitEditing={onLogin}
                    /> 
                    <Text style={{fontSize:20, fontWeight:'300'}}>Nombre del propietario:</Text>
                    <TextInput                
                        underlineColorAndroid='#850842'
                        placeholder='Ingrese su nombre'
                        placeholderTextColor='#850842'
                        keyboardType='default'
                        selectionColor="#850842"
                        autoCapitalize='none'
                        autoCorrect={false}        
                        
                        style={{color:'#850842',fontSize:20, width: '100%',
                                borderColor:'#850842', borderStyle:'solid',borderRadius:12
                            
                            }}
                        //onChangeText={(value)=> onChange(value, 'email')}
                        //value={email}
                        //onSubmitEditing={onLogin}
                    /> 
                    <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between',marginBottom:7}}>
                      <View>
                        <Text style={{fontSize:20, fontWeight:'300', flexDirection:'row'}}>Fecha de expiracion:</Text>
                        <TextInput                
                            underlineColorAndroid='#850842'
                            placeholder='06/12'
                            placeholderTextColor='#850842'
                            keyboardType='numbers-and-punctuation'
                            selectionColor="#850842"
                            autoCapitalize='none'
                            autoCorrect={false}        
                            
                            style={{color:'#850842',fontSize:20, width: '40%',
                                    borderColor:'#850842', borderStyle:'solid',borderRadius:12
                                
                                }}
                            //onChangeText={(value)=> onChange(value, 'email')}
                            //value={email}
                            //onSubmitEditing={onLogin}
                        /> 
                      </View>
                      <View>
                        <Text style={{fontSize:20, fontWeight:'300', flexDirection:'row', marginRight:10}}>CVV</Text>
                        <TextInput                
                            underlineColorAndroid='#850842'
                            placeholder='CVV'
                            placeholderTextColor='#850842'
                            keyboardType='numbers-and-punctuation'
                            selectionColor="#850842"
                            autoCapitalize='none'
                            autoCorrect={false}        
                            
                            style={{color:'#850842',fontSize:20, width: '100%',
                                    borderColor:'#850842', borderStyle:'solid',borderRadius:12, marginLeft:-5
                                
                                }}
                            //onChangeText={(value)=> onChange(value, 'email')}
                            //value={email}
                            //onSubmitEditing={onLogin}
                        /> 
                      </View>
                    </View>
                    <TouchableOpacity
                    style={{...styles.makeBuy, alignItems:'center',flexDirection:'row', justifyContent:'center'}}
                    onPress={updateSale}
                    >
                       <Icon name='card-outline' size={30} style={{marginRight:-0}} color='white'/>
                      <Text style={{...styles.text, color: 'white', padding:8 , fontSize:18, fontWeight:'bold'}}>Pagar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>


        <Modal
        animationType='slide'
        visible={deleteVisible}
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
                    height:250,
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
                {
                  timeIndicator && (
                    <View style={{position:'absolute', top:140, left:168}}>
                      <ActivityIndicator size="large" color="#850642" />
                      <Text style={{color:'#850642'}}>Eliminando</Text>
                    </View>
                  )
                }
                <Text style={{...styles.textTitleStatus,textAlign:'center', fontSize:28, fontWeight:'500'}}>¡Esta seguro de eliminar su compra!</Text> 
                <View style={{flexDirection:'row', marginTop:15}}>
                  <Icon name='caret-back-outline' size={25} color='#850642'/>
                  <Text style={{...styles.textTitleStatus, fontSize:25, color:'grey', marginTop:-5}}>{sale.producto_nombre}</Text>
                </View>
                {
                  timeIndicator === false && (
                    <>
                      
                    <View style={{justifyContent:'space-around', marginVertical:13, alignItems:'center', flexDirection:'row'}}>
                      <TouchableOpacity style={{...styles.makeBuy, flexDirection:'row', alignItems:'center'}} onPress={() =>(setdeleteVisible(false))}>
                      <Icon name='arrow-back-circle-outline' size={35} color='white'/> 
                        <Text style={{...styles.text, color:'white', padding:5, fontWeight:'500'}}>Cancelar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{...styles.makeBuy, flexDirection:'row', alignItems:'center'}} onPress={deleteProductSale}>
                        <Icon name='close-outline' size={35} color='white'/> 
                        <Text style={{...styles.text, color:'white', padding:5, fontWeight:'500'}}>Eliminar</Text>
                      </TouchableOpacity>
                    </View>
                    <Text>* Eliminando el producto puede elegir otro porducto para comprar</Text>

                    </>
                  )
                }
                </View>
            </View>
        </Modal>
    </View>
  )
}


const styles = StyleSheet.create({ 
    delete:{
      justifyContent:'center', 
      alignItems:'center' , 
      backgroundColor:'#850642', 
      height:40, 
      borderRadius:26,
      width:40,      
      position:'absolute',
      right:-10, top:-18
    },
    close:{
      position:'absolute',
      right:-10
    },
    parrafoText:{
      fontSize: 20,
      fontWeight: '400',
      textAlign:'justify',
      width:'100%'
    },
    imageStatus:{
      width: 200,
      height:150
    },
    textTitleStatus:{ fontSize:18,
      justifyContent:'center',
      fontWeight:'400', 
      color: '#850842',
      alignItems:'center'
    },
    cardPay:{
      width:'100%',
      height: 35,
      backgroundColor:'red',
      
    },
    container:{
      backgroundColor:'white',
      width:'70%',
      paddingHorizontal:10,
      marginTop:15
    },
    textContent:{
      fontSize:25,
      fontWeight:'400'
    },
    card:{
      height:100,
      width:'100%',
      backgroundColor:'white',
      borderRadius:50,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
  
      elevation: 24,
    },
    text:{
      color:'#850842',
      fontSize:22, 
      fontWeight:'bold'
    },
    makeBuy:{
      backgroundColor:'#850842',
      borderRadius:15,
      color: 'white', 
      fontSize:19, 
      padding:2,
      marginTop:-1,
      
    }
  });


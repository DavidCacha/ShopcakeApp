import React, { useState } from 'react'
import { Button, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

//interface Props extends StackScreenProps<any,any>{}

interface Props{
    title: string
}

export const PedidosState = ({title }:Props) => {

  const [isVisible, setIsVisible] = useState(false);
  const [statusVisible, setStatusVisible] = useState(false);


  const viewType = () => {
    return (
      <>  
        <View style={{marginTop:-3}}>              
              <Text style={{...styles.text, fontSize:22, fontWeight:'bold'}}>Pan de elote</Text>
              <View >
              <Text style={{...styles.text, fontWeight:'bold', fontSize:15}}>Estatus de pago:  </Text>
              <Text style={{...styles.text, fontSize:15, color:'black'}}>En proceso de pago</Text>
              </View>
            </View>
            <View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
              <Text style={{...styles.text, fontWeight:'bold', fontSize:17, marginBottom:5}}>Total a pagar: $250 MXN</Text>
              {
                title === 'Pendientes de pago' ? (
                    <TouchableOpacity 
                    style={styles.makeBuy}
                    onPress={()=>(setIsVisible(true))}
                    >
                        <Text style={styles.makeBuy}>Realizar pago</Text>
                    </TouchableOpacity>
                ) : 
                (
                    <View>
                        <Text style={{...styles.text, fontSize:19, color:'black', fontWeight:'300'}}>Estatus: Entregado</Text>
                    </View>
                )
              }
            </View>
      </>
    )
  }


  return (
    <View style={styles.container}>
        <Text style={styles.textContent}>{title}</Text>
        <View style={styles.card}>
          {
            title === 'Pendientes de pago' ? (
                <View style={{paddingHorizontal:25, marginTop:15 ,width:'100%', flexDirection:'row', justifyContent:'space-between'}}>          
                  {viewType()}
                </View>
            ) : (
              <TouchableOpacity onPress={()=> setStatusVisible(true)} style={{paddingHorizontal:25, marginTop:15 ,width:'100%', flexDirection:'row', justifyContent:'space-between'}}>          
              {viewType()}
            </TouchableOpacity>
            )
          }
        </View>

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
                    height:350,
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
                      <Text style={{fontSize:25,fontWeight:'bold', marginBottom:15}}>Realizar pago</Text>
                    </View>
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
                    <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
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
                    onPress={()=> setIsVisible(false)}
                    >
                       <Icon name='card-outline' size={30} style={{marginRight:-0}} color='white'/>
                      <Text style={{...styles.text, color: 'white', padding:8 , fontSize:18, fontWeight:'bold'}}>Pagar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

          
    <Modal
    animationType='slide'
    visible={statusVisible}
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
                <Text style={{fontSize:25,fontWeight:'bold', marginBottom:15}}>Estatus de pedido</Text>

                </View>
                <View style={{ justifyContent:'center', alignItems:'center', width:  '100%', flexDirection:'row'}}>
                   <View>
                   <Text style={styles.textTitleStatus}>Pan de elote</Text>
                   <Text  style={{...styles.textTitleStatus, color:'grey', fontSize:18}}>Cantidad: 4 Unidades</Text>
                   <Text  style={{...styles.textTitleStatus, color:'grey', fontSize:18}}>Total pagado: $286 MXN</Text>
                   <Text  style={{...styles.textTitleStatus, color:'grey', fontSize:18}}>Estatus compra: Pagado</Text>
                   <Text  style={{...styles.textTitleStatus, color:'grey', fontSize:18}}>Estatus <Text style={{color:'#850842', fontWeight:'bold'}}>Entregado</Text></Text>

                   </View>
                   <View style={{marginRight:-30}}>
                     <Image source={require('../assets/cake.png')} style={styles.imageStatus}/>
                   </View>
                </View>
                <Text style={{...styles.textTitleStatus, fontSize:25, fontWeight:'400'}}>Ingredientes</Text> 
                <View style={{ width:'100%', height:135, marginBottom:8}}>
                    <Text style={styles.parrafoText}>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
                </View>
                <TouchableOpacity
                style={{...styles.makeBuy, alignItems:'center'}}
                onPress={()=> setStatusVisible(false)}
                >
                  <Text style={{...styles.text, color: 'white', padding:8 , fontSize:18, fontWeight:'bold'}}>Cerrar ventana</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
      </View>
  )
}

const styles = StyleSheet.create({
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
    textTitleStatus:{
      justifyContent:'center',
      fontWeight:'400', 
      color: '#850842',
      fontSize:25,
      alignItems:'center'
    },
    cardPay:{
      width:'100%',
      height: 35,
      backgroundColor:'red',
      
    },
    container:{
      backgroundColor:'white',
      width:'100%',
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
      color:'#850842'
    },
    makeBuy:{
      backgroundColor:'#850842',
      borderRadius:15,
      color: 'white', 
      fontSize:19, 
      padding:4
    }
  });
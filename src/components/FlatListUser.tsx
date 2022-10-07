import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity, StyleSheet, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const FlatListUser = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.shadowView}>
        <Image source={require('../assets/elon.webp')} style={{width:100,marginLeft:0, height:100, borderRadius:50}}/>
        <View style={{marginLeft:15}}>
            <Text style={{fontSize:28, fontWeight:'bold', color:'#850642'}}>Elon Musk</Text>
            <Text style={{fontSize:18, fontWeight:'400'}}>Correo: elon@gmail.com</Text>
            <TouchableOpacity 
            onPress={()=> setIsVisible(true)} 
            style={{borderRadius:45,backgroundColor:'#850642',justifyContent:'center', alignItems:'center', width:100}}
            >
                <Text style={{color:'white', fontWeight:'bold', padding:8}}>Ver mas</Text>
            </TouchableOpacity>
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

    </View>
  )
}

const styles = StyleSheet.create({
  text:{
    color:'#850842'
  },
  makeBuy:{
    backgroundColor:'#850842',
    borderRadius:15,
    color: 'white', 
    fontSize:19, 
    padding:4
  },
  shadowView:{
    width:380,
    backgroundColor:'white',
    borderRadius:160, 
    flexDirection:'row', 
    marginBottom:15,
    shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,

  elevation: 12,
    }
});

import React, {useState,useEffect, useContext} from 'react'
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';



interface Props extends StackScreenProps<any,any> {}

export const LoginScreen = ({navigation}:Props) => {

    const [perfil, setPerfil] = useState('Cliente');

    const {singIn, message, removeError} = useContext(AuthContext);

    const {email, password, onChange} = useForm({
        email:'',
        password: ''
    });

    
    const onLogin = async() => {
        Keyboard.dismiss();
        singIn({correo: email, contraseña: password});
      }
    
      {/*useEffect(() => {
        if(message === 'Usuario no encontrado') return;
    
        Alert.alert('Login incorrecto',
        message,
        [
          {
            text: 'ok',
            onPress: removeError
          }
        ]
    
        );
      }, [message])*/}
    
    
  return (
    <KeyboardAvoidingView
        style={{flex:1}}
        behavior={(Platform.OS === 'ios')? 'padding': 'height'}
      >
        <View style={stylesLogin.view}>
        <Text style={stylesLogin.title}>Shopcake</Text>
        
        <Image source={require('../assets/cake.png')} style={{width:250, height:180, marginBottom:10}}/>
        <View style={stylesLogin.content}>
            <Text style={stylesLogin.subTitle}>Correo electronico:</Text>
            <TextInput                
                        underlineColorAndroid='#850842'
                        placeholder='Ingrese su email'
                        placeholderTextColor='#850842'
                        keyboardType='email-address'
                        selectionColor="#850842"
                        autoCapitalize='none'
                        autoCorrect={false}        
                        
                        style={{color:'#850842',fontSize:20, width: '100%',
                                borderColor:'#850842', borderStyle:'solid',borderRadius:12
                            
                            }}
                        onChangeText={(value)=> onChange(value, 'email')}
                        value={email}
                        onSubmitEditing={onLogin}
            />
            <Text style={{...stylesLogin.subTitle, marginTop:25}}>Contraseña:</Text>
            <TextInput                
                        onSubmitEditing={onLogin}
                        underlineColorAndroid='#850842'
                        placeholder='***********'
                        placeholderTextColor='#850842'
                        selectionColor="#000"
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        style={{color:'#850842',fontSize:20, width: '100%',
                                borderColor:'#850842', borderStyle:'solid',borderRadius:12
                            
                            }}
                        onChangeText={(value)=> onChange(value, 'password')}
                        value={password}
            />
            <View style={stylesLogin.buttonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={stylesLogin.button}
                //onPress={Login2}
                onPress={onLogin}
              >
                <Text style={stylesLogin.buttonText}>Iniciar sesion</Text>
              </TouchableOpacity>
            </View>
            <View style={stylesLogin.newUserContainer}>
              <TouchableOpacity
              activeOpacity={0.8}
              onPress={
                    ()=> navigation.replace('RegisterScreen')
              }
              
              >
                <Text style={stylesLogin.buttonNewUser}>Registrate o crea una cuenta</Text>
                </TouchableOpacity> 
            </View>
        </View>
        
    </View>
    </KeyboardAvoidingView>
    
  )
}

const stylesLogin = StyleSheet.create({
    newUserContainer: {
        width:'100%',
        alignItems:'center',
        marginTop:10
    },
    buttonReturn:{
        position:'absolute',
        top:50,
        left:20,
        borderWidth:1,
        borderColor:'white',
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:180
    },
    buttonContainer: {
        justifyContent:'center',
        width:'100%',
        alignItems:'center',
        marginTop:20
    },
    button: {
        borderWidth:2,
        width:200,
        alignItems:'center',
        backgroundColor:'#850842',
        borderColor:'#850842',
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:100
    },
    buttonNewUser: {
        fontSize:22,
        color:'#850842',
        fontWeight:'300'
        
    },
    buttonText:{
        fontSize:22,
        color:'white'
    },
    viewTextInput:{        
        height:50,
        width:'100%'
    },
    view:{
        flex:1,
        paddingHorizontal:50,
        alignItems:'center',
        justifyContent:'center',
        height:1000,
        marginBottom:-50 
    },
    subTitle:{
        fontSize:25,
        fontWeight:'300',
        color:'black'
    },
    title: {
        fontSize:45,
        fontWeight:'bold',
        fontStyle:'italic',
        color:'#850842',
        marginTop:10
    },
    content: {
        alignItems:'flex-start',
        borderColor:'#850842',
        height:400,
        width:350,
    }
});



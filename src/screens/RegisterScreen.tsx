import React, { useEffect, useState, useContext} from 'react';
import { AuthContext } from '../context/AuthContext';

import { Image, Keyboard, ActivityIndicator,KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Alert, Pressable } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { CustomSwitch } from '../components/customSwitch';
import { useForm } from '../hooks/useForm';

interface Props extends StackScreenProps<any, any>{}

export const RegisterScreen = ({navigation}:Props) => {

  const {singUp, message} = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(true);

  const [user, setUser] = useState('');
  
  const {form, onChange, isSubscript, code, email, name, password} = useForm({
    email:'',
    password:'',
    name:'',
    code:'',
    phone:'',
    isSubscript: false
  });
  

  useEffect(() => {
    setModalVisible(false);
    
  }, [])
  

  const onRegister = () => {
    Keyboard.dismiss();
    
    setModalVisible(true);
    
    var timout = setTimeout(() => {
      singUp({
        nombre: name,
        correo: email,
        contraseña: password,
        usuario: user
      })
      setModalVisible(false);
      navigation.navigate('Login')    
    }, 3000);
    
    
  }

  
   
  return (
    <KeyboardAvoidingView
        style={{flex:1}}
        behavior={(Platform.OS === 'ios')? 'padding': 'height'}
      >
        <View style={stylesLogin.view}>
        <Text style={stylesLogin.title}>Registrate</Text>
        
        <View style={stylesLogin.content}>
        <Text style={stylesLogin.subTitle}>Nombre completo:</Text>
            <TextInput                
                        underlineColorAndroid='#850842'
                        placeholder='Ingrese su nombre completo'
                        placeholderTextColor='#850842'
                        keyboardType='default'                        
                        selectionColor="#850842"
                        autoCapitalize='none'
                        autoCorrect={false}        
                        
                        style={{color:'#850842',fontSize:20, width: '100%',
                                borderColor:'#850842', borderStyle:'solid',borderRadius:12
                            
                            }}
                        onChangeText={(value)=> onChange(value, 'name')}
                        value={name}
                        onSubmitEditing={onRegister}
            />
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
                        onSubmitEditing={onRegister}
            />
            <Text style={{...stylesLogin.subTitle, marginTop:25}}>Contraseña:</Text>
            <TextInput                
                        onSubmitEditing={onRegister}
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
            <Text style={{...stylesLogin.subTitle, marginTop:25}}>Tipo de usuario:</Text>
            <View style={{height:50, width:'100%', marginTop:20}}>
              <Picker
                style={{backgroundColor:'#850842', color:'white'}}
                dropdownIconColor='white'
                selectedValue={user}
                onValueChange={(itemValue, itemIndex) =>
                  setUser(itemValue)
                }>
                <Picker.Item    label="Selecciona tipo de usuario" value={null} />
                <Picker.Item   label="Cliente" value={'Cliente'}  />
                <Picker.Item  label="Administrador" value={'Administrador'} />
              </Picker>
            </View>
            {
              user === null || 'undefained' && (
                <>
                </>
              ) 
            }
            {
              user === 'Cliente'  && (
                <View style={{...stylesLogin.buttonContainer, backgroundColor:'white'}}>
                  <View style={{flexDirection:'row', alignItems:'center', marginBottom:15}}>
                    <CustomSwitch onChange={(value) => onChange( value, 'isSubscript')}  isOn={isSubscript}/>
                    <Text>Aceptas terminos y condiciones</Text>
                  </View>
                  {
                    isSubscript && (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={stylesLogin.button}
                        //onPress={()=>navigation.navigate('Login')}
                        onPress={onRegister}
                      >
                        
                        <Text style={stylesLogin.buttonText}>Crear cuenta</Text>
                      </TouchableOpacity>
                    )
                  }
                </View>
              )
            }
            {
              user === 'Administrador' && (
                <View style={stylesLogin.buttonContainer}>
                  <View style={{flexDirection:'column', alignItems:'center', marginBottom:15}}>
                   
                    <Text style={{fontSize:18}}>Ingrese codigo de administrador</Text>
                    <TextInput                
                        onSubmitEditing={onRegister}
                        underlineColorAndroid='#850842'
                        placeholder='******'
                        placeholderTextColor='#850842'
                        selectionColor="#000"
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        style={{color:'#850842',fontSize:25, width: '100%', textAlign:'center',
                                borderColor:'#850842', borderStyle:'solid',borderRadius:12
                            
                            }}
                        onChangeText={(value)=> onChange(value, 'code')}
                        value={code}
                    />
                    {
                      code === '123456' ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={stylesLogin.button}
                        //onPress={()=>navigation.navigate('Login')}
                        onPress={onRegister}
                      >
                        
                        <Text style={stylesLogin.buttonText}>Crear cuenta</Text>
                      </TouchableOpacity>
                    ) : code === '' ? ( <></>
                    ) : <Text style={{textAlign:'center', fontSize:18}}>Ingrese el codigo correcto o consulte con el personal autorizado</Text>

                  }
                  </View>
                  
                </View>
              ) 
            }
        </View>
        
    </View>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={stylesLogin.centeredView}>
          <View style={stylesLogin.modalView}>
            <ActivityIndicator size="large" color="#850842" />
            
          </View>
        </View>
      </Modal>
    
    </KeyboardAvoidingView>
    
  )
}

const stylesLogin = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
   
  },
  
  
  
 
  
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
        paddingHorizontal:30,
        alignItems:'center',
        justifyContent:'center',
        height:1000,
        marginBottom:-50 ,
        backgroundColor:'white'
    },
    subTitle:{
        fontSize:25,
        fontWeight:'500',
        color:'black'
    },
    title: {
        fontSize:45,
        fontWeight:'300',
        color:'#850842',
        marginTop:-150,
        marginBottom:20        
    },
    content: {
        alignItems:'flex-start',
        height:450,
        width:350,
    }
});





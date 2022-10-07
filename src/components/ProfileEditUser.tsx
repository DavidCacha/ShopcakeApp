import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../context/AuthContext'
import { useProfile } from '../hooks/useProfile';
import { useForm } from '../hooks/useForm';



export const ProfileEditUser = () => {

  const navigation = useNavigation();
    
  const {user,logOut} = useContext(AuthContext);

  const {profile, addProfiles, updateProfile} = useProfile(user?.nombre);

  
  useEffect(()=>{
    loadProfile
  },[])
 

  const loadProfile = async() => {
    setFormValue({
      correo,
      nombre,
      telefono,
      direccion,
      apellido,
      estatus
    })
  }  

  const {form, onChange,  correo, nombre, telefono, direccion, apellido, estatus, setFormValue} = useForm({
    correo:'',
    nombre:'',
    telefono:'',
    direccion:'',
    apellido:'',
    estatus: 'Activo'
  });

  const saveDate = () => {
    //updateProfile(profile._id,datosObj)
    navigation.navigate('TabNavigator')
  }


  return (
    <ScrollView>
        <View style={styles.profile}>
        <View>
            <TouchableOpacity style={styles.logout} onPress={logOut}>
              <Icon name='log-out-outline' size={45} color='#850842'/>  
            </TouchableOpacity> 
            <View style={styles.contentImage}>
            {
                profile.image ? (
                    <Image source={{uri: `http://10.0.2.2:4444/api/profile_image/${profile.image}`}} style={styles.image}/>
                ):<Image source={require('../assets/profileDefault.jpg')} style={styles.image}/>
            } 
            <View style={styles.camara}>
              <TouchableOpacity>
                <Icon
                name='camera-outline'
                size={35}
                color='white'
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{width:'100%', paddingHorizontal:30}}>
          <Text style={styles.subTitle}>Nombre completo</Text>
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
                          onChangeText={(value)=> onChange(value, 'nombre')}
                          value={nombre}
                          //onSubmitEditing={saveDate}
              />
            <Text style={styles.subTitle}>Correo</Text>
              <TextInput                
                          underlineColorAndroid='#850842'
                          placeholder='Ingrese su correo'
                          placeholderTextColor='#850842'
                          keyboardType='email-address'
                          selectionColor="#850842"
                          autoCapitalize='none'
                          autoCorrect={false}        
                          
                          style={{color:'#850842',fontSize:20, width: '100%',
                                  borderColor:'#850842', borderStyle:'solid',borderRadius:12
                              
                              }}
                          onChangeText={(value)=> onChange(value, 'correo')}
                          value={profile.email}
                          onSubmitEditing={saveDate}
              />
              <Text style={styles.subTitle}>Telefono</Text>
              <TextInput                
                          underlineColorAndroid='#850842'
                          placeholder='Ingrese su telefono'
                          placeholderTextColor='#850842'
                          keyboardType='numeric'
                          selectionColor="#850842"
                          autoCapitalize='none'
                          autoCorrect={false}        
                          
                          style={{color:'#850842',fontSize:20, width: '100%',
                                  borderColor:'#850842', borderStyle:'solid',borderRadius:12
                              
                              }}
                          onChangeText={(value)=> onChange(value, 'telefono')}
                          value={profile.telefono}
                          onSubmitEditing={saveDate}
              />
              <Text style={styles.subTitle}>Direccion</Text>
              <TextInput                
                          underlineColorAndroid='#850842'
                          placeholder='Ingrese su direccion de envio'
                          placeholderTextColor='#850842'
                          keyboardType='default'
                          selectionColor="#850842"
                          autoCapitalize='none' 
                          style={{color:'#850842',fontSize:20, width: '100%',
                                  borderColor:'#850842', borderStyle:'solid',borderRadius:12
                              
                              }}
                          onChangeText={(value)=> onChange(value, 'direccion')}
                          value={profile.direccion}
                          onSubmitEditing={saveDate}
              />
               <Text style={styles.subTitle}>Datos de entrega</Text>
              <TextInput                
                          underlineColorAndroid='#850842'
                          placeholder='Datos adicionales'
                          placeholderTextColor='#850842'
                          keyboardType='default'
                          selectionColor="#850842"
                          autoCapitalize='none'
                          autoCorrect={false}        
                          
                          style={{color:'#850842',fontSize:20, width: '100%',
                                  borderColor:'#850842', borderStyle:'solid',borderRadius:12
                              
                              }}
                          onChangeText={(value)=> onChange(value, 'apellido')}
                          value={profile.apellido}
                          onSubmitEditing={saveDate}
              />
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around', width:'100%'}}>
          <TouchableOpacity style={styles.saveChange} onPress={saveDate}>
            <Text style={styles.saveText}>Guardar cambios</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveChange} onPress={()=> navigation.navigate('ProfileUser')}>
            <Text style={styles.saveText}>Eliminar perfil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    logout:{
      position:'absolute',
      zIndex:9999,
      left:-80,
      top:30
    },
    saveChange:{
      marginTop:10,
      backgroundColor:'#850842',
      borderRadius:13,
      marginBottom:25
    },
    saveText:{
      color:'white',
      fontSize:20,
      padding:8,
    },
    subTitle:{
      fontSize:25,
      fontWeight:'500',
      color:'black'
  },
    profile: {
      backgroundColor:'white',
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    textTitle:{
      fontSize:35,
      fontWeight:'500',
      color:'#850842'
    },
    image:{
      
      borderRadius:100,
      height:180,
      width:180
    },
    contentImage:{
      marginTop:10,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:100,
      height:200,
      width:200,
      backgroundColor:'#850842'
    },
    camara:{
      justifyContent:'center',
      alignItems:'center',
      height:50,
      width:50,
      backgroundColor:'#850842',
      borderRadius:25,
      bottom:25,
      right:-10,
      position:'absolute',
      zIndex:9999
    }
  });
  

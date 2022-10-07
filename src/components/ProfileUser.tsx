import React, { useContext } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext'
import { useProfile } from '../hooks/useProfile'
import { useNavigation } from '@react-navigation/native'
import { ProntEditProfile } from './ProntEditProfile';


export const ProfileUser = () => {

  
  
  const {user} = useContext(AuthContext);

  const {profile} = useProfile(user?.nombre);

 


  return (
    <ScrollView>
        <View style={styles.profile}>
        <View style={{flexDirection:'row-reverse', justifyContent:'center', alignItems:'center'}}>
          <ProntEditProfile params='nombre' datos={profile} title='Actuliza tu nombre' text='Ingresa tu nombre con el cual estas registrado'/> 
          <Text style={{...styles.textTitle, textAlign:'center', marginTop:15}}>{profile.nombre}</Text>
        </View>
        <View>
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
              <View>                     
                <View style={{flexDirection:'row-reverse', justifyContent:'space-between'}}>
                  <ProntEditProfile params='email' datos={profile} title='Actuliza tu correo' text='Ingresa tu correo con el cual estas registrado'/> 
                  <Text style={styles.subTitle}>Correo</Text>
                </View>
                <Text style={{fontSize:20}}>{profile.email}</Text>
              </View>
              <View>
              <View style={{flexDirection:'row-reverse', justifyContent:'space-between'}}>
                  <ProntEditProfile params='telefono' datos={profile} title='Actuliza tu telefono' text='Ingresa tu numero telefonico en caso de contactarnos contigo'/> 
                  <Text style={styles.subTitle}>Telefono</Text>
                </View>
                <Text style={{fontSize:20}}>{profile.telefono}</Text>
              </View>
              <View>
              <View style={{flexDirection:'row-reverse', justifyContent:'space-between'}}>
                  <ProntEditProfile params='direccion' datos={profile} title='Actuliza tu direccion' text='Ingresa tu direccion de entrega, ya que es importante para la entrega de tu pedido.'/> 
                  <Text style={styles.subTitle}>Direccion</Text>
                </View>
                <Text style={{fontSize:20, width:'100%'}}>{profile.direccion}</Text>
              </View>
              <View>
                <View style={{flexDirection:'row-reverse', justifyContent:'space-between'}}>
                    <ProntEditProfile params='apellido' datos={profile} title='Actuliza tus datos de entrega' text='Especifica las condiciones de entrega, ubicacion o persona que recibe'/> 
                    <Text style={styles.subTitle}>Datos de entrega</Text>
                </View>
                <Text style={{fontSize:20, width:'100%',textAlign:'justify'}}>{profile.apellido}</Text>
              </View>
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
    subTitle:{
      fontSize:20,
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
  

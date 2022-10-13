import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { Pedidos } from '../screens/Pedidos';
import { PerfilScreen } from '../screens/PerfilScreen';
import { ProductosScreen } from '../screens/ProductosScreen';
import { FadeInImage } from '../hooks/FadeImage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

export const DrawerClient = () => {
    const {user,logOut} = useContext(AuthContext);

    const {profile} = useProfile(user?.nombre);

    return (
        <Drawer.Navigator
        drawerContent={()=> <Perfil/>}
        screenOptions={{
          drawerStyle:{backgroundColor:'white', height:510},
          
          drawerLabelStyle:{color:'white'},
          drawerActiveBackgroundColor: 'rgba(244, 249, 245,0.2)',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#850642'} 
        
        }}
        >
            <Drawer.Screen name='Productos en venta' component={ProductosScreen}/>
            <Drawer.Screen name='Carrito' component={Pedidos}/>
            <Drawer.Screen name='Ajustes de perfil' component={PerfilScreen}/>

        </Drawer.Navigator>
    )
}

const Perfil = () => {

  const navigation = useNavigation();
    
  const {user,logOut} = useContext(AuthContext);

  const {profile} = useProfile(user?.nombre);
    return(
        <DrawerContentScrollView style={{}}>
            <View style={{justifyContent:'center', alignItems:'center', marginTop:25}}>
              <View style={styles.contentImage}>
                <Image source={{uri: `http://10.0.2.2:4444/api/profile_image/${profile.image}`}} style={styles.image}/>
              </View>
              <Text style={styles.textTitle}>{profile.nombre}</Text>
              <View style={{width:'100%', padding:25}}>
              <TouchableOpacity onPress={()=> navigation.navigate('Productos en venta')}  style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                  <Icon name='people-outline' color='#850642' size={25}/>
                  <Text style={styles.subTitle}>Productos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Carrito')} style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                  <Icon name='bookmark-outline' color='#850642' size={25}/>
                  <Text style={styles.subTitle}>Pedidos</Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={()=> navigation.navigate('Ajustes de perfil')} style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
                  <Icon name='settings-outline' color='#850642' size={25}/>
                  <Text style={styles.subTitle}>Ajuste</Text>
                </TouchableOpacity>                             
              </View>
              <TouchableOpacity style={styles.logout} onPress={logOut}>
                <Icon name='log-out-outline' size={25} color='white'/> 
                <Text style={{color:'white', fontWeight:'600', marginLeft:10 , fontSize:15}}>Cerrar sesion</Text>
              </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    logout:{
      flexDirection:'row',
      backgroundColor:'#850642',
      width:250,
      height:35,
      borderRadius:15,
      justifyContent:'center',
      alignItems:'center'
    },
    subTitle:{
      paddingVertical:5,
      fontSize:20,
      marginLeft:10,
      fontWeight:'300',
      color:'#850642'
  },
    profile: {
      backgroundColor:'white',
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    textTitle:{
      fontSize:25,
      textAlign:'center',
      fontWeight:'500',
      color:'#850842'
    },
    image:{
      borderColor:'black',
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
    }
  });
  

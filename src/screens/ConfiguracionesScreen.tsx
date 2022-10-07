import React, { useContext } from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';


export const ConfiguracionesScreen = () => {

  const {logOut, user} = useContext(AuthContext);


  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:25, marginBottom:45}}>{user?.nombre}</Text>
        <TouchableOpacity style={styles.btn} onPress={logOut}>
            <Text style={styles.btnText}>Cerrar sesion</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor:'#850842',
        borderRadius: 45
    },
    btnText:{
        color:'white',
        padding:10,
        fontSize:20,
        fontWeight:'bold'
    }
});

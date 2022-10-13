import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity, StyleSheet, TextInput, Modal, Alert, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FadeInImage } from '../hooks/FadeImage';
import { Perfiles } from '../interfaces/saleInterface';
import { ProfileUsers } from './ProfileUsers';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

interface Props{
  datos: Perfiles
}

export const FlatListUser = ({datos}:Props) => {

  const navigation = useNavigation();

  const [isVisible, setIsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <>
    <TouchableOpacity onPress={()=>setModalVisible(true)} style={styles.container} >
      <View style={{width:'50%', marginLeft:25}}>  
      
      <Text style={{color:'#850642', fontSize:16, fontWeight:'600'}}>Nombre:</Text>      
      <Text>{datos.nombre}</Text>      
      <View style={{flexDirection:'row'}}>
      <Text style={{color:'#850642', fontSize:16, fontWeight:'600'}}>Contacto:</Text>
      <Text>{datos.telefono}</Text>
      </View>
      </View>
      {
        datos.image ? (
          <FadeInImage uri={ `http://10.0.2.2:4444/api/profile_image/${datos.image}`} style={{
            width:'50%', height:90, marginLeft:-25
        }}/>
        ) : <Image source={require('../assets/profileDefault.jpg')} style={{
          width:'25%', height:90, marginLeft:15}}/>
      }
     
    </TouchableOpacity>
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
            <ProfileUsers close={closeModal} profile={datos}/>
      </Modal>
    </View>
    </>
    
  )
}

const styles = StyleSheet.create({
  container:{
    borderRadius:100,
    alignItems:'center',
    flexDirection:'row',
    width:'98%',
    height:100,
    backgroundColor:'white',
    shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.85,
      shadowRadius: 4,
      elevation: 5
  },
  centeredView: {
    flex: 1,
    zIndex:99,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 17,
  },
  modalView: {
    margin: 20,
    width:'50%',
    height:'85%',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 25,
    right:15,
    top:10,
    padding: 0,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    position:'absolute',
    left:110,
    backgroundColor: "white",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

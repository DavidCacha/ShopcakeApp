import { Picker } from '@react-native-picker/picker'
import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Image, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PedidoAdmin } from '../components/PedidoAdmin';
import { SearchInputs } from '../components/SearchInputs';
import { useSales } from '../hooks/useSales';


export const PedidosAdmin = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedValue, setSelectedValue] = useState("");

  const {saleAll,getSale , filterByStatus} = useSales();


  
  useEffect(()=>{
    setModalVisible(true)
    getSale();
    //querySale('null')

  },[])

  const refreshData = () => {
    setModalVisible(true)
    getSale();
  }

  const querySale = (itemValue:string) => {
    
    setSelectedValue(itemValue);
    filterByStatus(itemValue, 'true');
  }
   //console.log(saleAll)

  return (
    <View style={{flex:1, backgroundColor:'white'}}>
    <Picker
      style={{backgroundColor:'#850842', color:'white'}}
      dropdownIconColor='white'
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => {
        querySale(itemValue) 
      }}>
      
      <Picker.Item  label="Pendiente de pago" value={'null'}  />
      <Picker.Item  label="Cambio de estatus" value={'Empaquetado'} />
      <Picker.Item  label="Pedidos entregado" value={'Entregado'} />

    </Picker>
    {/*<Text>{selectedValue}</Text>*/}
   
    <PedidoAdmin refresh={refreshData} datos={saleAll} params={selectedValue}/>
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>¡Importante!</Text>
            <Text style={{fontSize:16}}>Es importante selleecionar una opcion para filtrar los pedidos.</Text>
            <Image source={require('../assets/imageModal.png')} style={{width:'45%', marginTop:-20, height:200}}/>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible), querySale('null')}}
            >
              <Text style={styles.textStyle}>Cerrar ventana</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
     
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    height:400,
    width:'95%',
    backgroundColor: "white",
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
    
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#850642",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize:25,
    textAlign: "center"
  },
  modalText: {
    color: "#850642",
    marginBottom: 15,
    fontWeight:'600',
    
    fontSize:35,
    textAlign: "center"
  }
});
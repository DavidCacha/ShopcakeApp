import React, { useEffect, useState } from 'react'
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Pressable, Alert, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSales } from '../hooks/useSales';
import { useNavigation } from '@react-navigation/native';
import { useProducts } from '../hooks/useProducts';
import { useProfile } from '../hooks/useProfile';
import { FadeInImage } from '../hooks/FadeImage';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { Estado } from '../interfaces/appIterfaces';

interface Props{
  refresh:any,
    sale: any;
}
export const ViewSaleAdmin = ({refresh, sale}:Props) => {

  
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [selectedValue, setSelectedValue] = useState("");


  const {getprofile, profile} = useProfile('');
  const {getProductById, productoID}= useProducts();

  const [modalVisible, setModalVisible] = useState(false);
  const {getProductBySearch, productoSearch} = useProducts();
  const navigation = useNavigation();
  const {updateSaleUser, deleteSale} = useSales();
  const [timeIndicator, setTimeIndicator] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [deleteVisible, setdeleteVisible] = useState(false);

  const {loadSale} = useSales();

  const ModalSale = async() => {
    getprofile(sale.id_solicitante);
    setModalVisible(true)
    getProductBySearch(sale.producto_nombre);

    
  }
    
  useEffect(()=>{
    getProductById(sale.producto_nombre)

  },[])
  
  
  
  const updateSale = () => {
    updateSaleUser({...sale, estado: selectedValue}, sale._id)
    setModalVisible(!modalVisible);
    refresh();
    //updateSaleUser(saleObject, id);
  }

  const deleteSaleById = () =>{
      deleteSale(sale._id);
      setModalVisible(!modalVisible);
      refresh();
      //setTimeIndicator(true);
      //setTimeout(timeSale, 3000);

  }

  return (
    <>
       <TouchableOpacity onPress={() => ModalSale()} style={styles.card}>   
       
        <View style={{paddingHorizontal:25, marginTop:15 ,width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
        <View style={{marginTop:-3}}>              
       
                  <Text style={styles.text}>{productoID?.nombre}</Text>
                  <View style={sale.estado !== 'null' ? {flexDirection:'row'} : {flexDirection:'column'}}>
                  <Text style={{...styles.text, fontWeight:'bold', fontSize:15}}>Estatus de pago:  </Text>
                  <Text style={{...styles.text, fontSize:15, color:'black'}}>{sale.datos}</Text>                  
                  </View>                  
                  {
                    sale.estado !== 'null' && (
                      <View style={{width:'100%'}}>
                        <Text style={{...styles.text, fontWeight:'400', marginTop:3, fontSize:17, }}>Estatus de entrega: {sale.estado} </Text>
                      </View>
                    )
                  }
                </View>  
                <FadeInImage uri={ `http://10.0.2.2:4444/api/product_image/${productoID?.image}`} style={{
                    width:100, height:70, marginTop:0, marginLeft:-10, marginBottom:8
                }}/> 
        </View>
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
        <View style={styles.centeredView}>

          <View style={ sale.estado !== 'null' && sale.estado !== 'Entregado' && !isEnabled ?  {...styles.modalView, height:'95%'} :styles.modalView }>
          <TouchableOpacity style={styles.close} onPress={() => setModalVisible(false)}>                            
                             <Icon name='close-outline' size={45} color='#850642'/> 
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
            
            <Text style={styles.modalText}>{productoID?.nombre}</Text>
            <View style={{width:'100%', flexDirection:'row', justifyContent:'space-between'}}>
              <View>
              <Text style={{fontSize:16}}>Solicitante: {profile.nombre}</Text>
              <Text style={{fontSize:16}}>Precio comprado: ${sale.telefono} MXN</Text>
              <Text style={{fontSize:16}}>Total pagado: ${sale.total} MXN</Text> 
              <Text style={{fontSize:16}}>Unidades compradas: {sale.cantidad}</Text>
              <Text style={{fontSize:16}}>Estadus de compra: {sale.datos}</Text>
              </View>
            </View>
            <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
              <FadeInImage uri={ `http://10.0.2.2:4444/api/product_image/${productoID?.image}`} style={{
                      width:180, height:160, marginBottom:8
                  }}/>
            </View>
            <View style={{width:'100%', marginBottom:15}}>
              <Text style={{fontSize:17, color:'#850642'}}>Direccion de entrega: </Text>
              <Text style={{fontSize:16}}>{profile.direccion}</Text>
              <Text style={{fontSize:17, color:'#850642'}}>Telefono de contacto: </Text>
              <Text style={{fontSize:16}}>{profile.telefono}</Text>
              <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'flex-start'}}>
              <Switch
                trackColor={{ false: "grey", true: "#850642" }}
                thumbColor={isEnabled ? "#850642" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text style={{fontSize:17}}>Eliminar pedido</Text>
              </View>
             {
              !isEnabled === true && (
                <>
                  {
                  sale.estado !== 'null' && sale.estado !== 'Entregado'  && (
                  <>
                    <Text style={{fontSize:17, color:'#850642'}}>Cambia el estado del pedido: </Text>
                    <Picker
                    selectedValue={selectedValue}
                    dropdownIconColor='white'
                    style={{ height: 50, width: '100%', color:'white' ,backgroundColor:'#850642'}}
                    onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue(itemValue);
                    }}
                    >
                    <Picker.Item label="Selecciona un estado" value="" />
                    <Picker.Item label="Enviado" value="Enviado" />
                    <Picker.Item label="Entregado" value="Entregado" />
                    </Picker>
                  </>
                  )
                }
                </>
              )
             }
            </View>

            {
              isEnabled ? (
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={isEnabled ? deleteSaleById : updateSale}
              >
                <Text style={styles.textStyle}>Eliminar pedido</Text>
                </Pressable>
                
              ) : (
                <>
                {
                  (sale.datos === 'Pagado' && sale.estado !== 'Entregado') && (
                    
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={ updateSale}
              >
                <Text style={styles.textStyle}>Guardar cambios</Text>
                </Pressable>
                  )
                }
                </>
              )
            }
               
           
            </ScrollView>
          
          </View>
        </View>
      </Modal>
    </View>
    </>
   
  )
}


const styles = StyleSheet.create({ 
  close:{
    zIndex:999,
    position:'absolute',
    right:5,
    top:5
},
  centeredView: {
    backgroundColor:'#0d0e0acc',
    flex:1
,      justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    margin: 20,
    height:'82%',
    width:'95%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
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
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#850642",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    fontSize:23,
    fontWeight:'bold',
    color:'#850642',
    textAlign: "center"
  },
    
    text:{
      color:'#850842',
      fontSize:22, 
      fontWeight:'bold'
    },
    
    card:{
      height:110,
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
  });


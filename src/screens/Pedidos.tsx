import { Picker } from '@react-native-picker/picker';
import React, { useContext, useEffect, useState } from 'react'
import { Text, View, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import { FlatListSaleUser } from '../components/FlatListSaleUser';
import { PedidosState } from '../components/PedidosState';
import { useSales } from '../hooks/useSales';
import { AuthContext } from '../context/AuthContext';
import { useProfile } from '../hooks/useProfile';
import shopcakeApi from '../api/shopCake';

export const Pedidos = () => {

  const {sale, filterByStatus, loadSale} = useSales();

  const [selectedValue, setSelectedValue] = useState("Pendientes de pago");

  const reloadQuery = () =>{
    loadSale();
  }

  
  return (
    <View style={{flex:1, backgroundColor:'white'}} >
       <Picker
        selectedValue={selectedValue}
        dropdownIconColor='white'
        style={{ height: 50, width: '100%', color:'white' ,backgroundColor:'#850642'}}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          filterByStatus(itemValue)
        }}
      >
        <Picker.Item label="Pendientes de pago" value="null" />
        <Picker.Item label="Estatus de envios" value="Empaquetado" />
        <Picker.Item label="Pedidos entregados" value="Entregado" />
      </Picker>
     <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'white', width:'100%'}}>
    
      {
        sale.length === 0 ? (
          <View style={{justifyContent:'center', alignItems:'center', marginTop:220}}>
            <Text style={{color:'#850642', fontWeight:'bold', fontSize:25, textAlign:'center'}}>No hay pedidos solicitados por el momento</Text>
          </View>
        ) : (      <FlatListSaleUser refresh={reloadQuery} params={selectedValue} datos={sale}/> 
)
      }
          
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color:'#850842',
    marginTop:15,
    fontSize: 35
  },
  subTitle:{
    fontSize:25,
    fontWeight:'bold',
    marginTop:5,
    marginLeft:-165
  }
});


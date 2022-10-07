import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSales } from '../hooks/useSales';
import { useProducts } from '../hooks/useProducts';
import { FadeInImage } from '../hooks/FadeImage';
import { ProducttResponseAll } from '../interfaces/appIterfaces';
import shopcakeApi from '../api/shopCake';
import { useRef } from 'react';


export const PedidoAlone = ({navigation, route }:any) => {

    const [params, setParams] =  useState<any>('');

    const {salesInMemoryId, saleById} = useSales();

    const {getProductImage,dataProduct} = useProducts();

    var name = useRef<any>();
    
    useEffect(() => {
        saleById(route.params.id);
       getProductImage(route.params.name);
    }, [])

    const navigate = () => {
        navigation.pop()
    }

    
  return (
    <View style={{flex:1, 
        paddingHorizontal:15, backgroundColor:'white'}}>
                <View style={{ alignItems:'center' , justifyContent:'center'}}>
                <Text style={{fontSize:25,fontWeight:'bold', marginBottom:15, color:'#850842', paddingVertical:18}}>Estatus de pedido entregado</Text>

                </View>
                <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'white'}}>
                   <FadeInImage uri={ `http://10.0.2.2:4444/api/product_image/${dataProduct}`}  style={{
                    width:220, height:200, marginTop:0, marginLeft:0, marginBottom:8
                }}/>
                   </View>
                 <View style={{  width:  '100%', flexDirection:'row', justifyContent:'space-between'}}>
                   <View >
                   <Text style={styles.textTitleStatus}>{salesInMemoryId.current?.producto_nombre}</Text>
                   <Text  style={styles.textTitleStatus}>Cantidad: {salesInMemoryId.current?.cantidad} Unidades</Text>
                   <Text  style={styles.textTitleStatus}>Total pagado: ${salesInMemoryId.current?.total} MXN</Text>
                  </View>
                  <View>
                  <Text  style={{...styles.textTitleStatus, textAlign:'right'}}>Estatus compra:</Text>
                  <Text style={{...styles.textTitleStatus, textAlign:'right'}}> {salesInMemoryId.current?.datos}</Text> 
                   <Text  style={{...styles.textTitleStatus, textAlign:'right', color:'#850842', fontWeight:'bold'}}>Estatus {salesInMemoryId.current?.estado}</Text>
                 
                  </View>
                  
                </View>
                <Text style={{...styles.textTitleStatus, fontSize:25, fontWeight:'400',color:'#850842', marginTop:15}}>Ingredientes</Text> 
                <View style={{ width:'100%', height:135, marginBottom:8}}>
                    <Text style={styles.parrafoText}>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
                </View>
                <TouchableOpacity
                style={{...styles.makeBuy, alignItems:'center', marginTop:15}}
                onPress={navigate}
                >
                  <Text style={{...styles.text, color: 'white', padding:8 , fontSize:18, fontWeight:'bold'}}>Cerrar ventana</Text>
                </TouchableOpacity>
    </View>
  )
}




const styles = StyleSheet.create({
    parrafoText:{
      fontSize: 20,
      fontWeight: '400',
      textAlign:'justify',
      width:'100%'
    },
    imageStatus:{
      width: 150,
      height:100
    },
    textTitleStatus:{ fontSize:18,
      justifyContent:'center',
      fontWeight:'400', 
      color: 'grey',
      alignItems:'center'
    },
    cardPay:{
      width:'100%',
      height: 35,
      backgroundColor:'red',
      
    },
    container:{
      backgroundColor:'white',
      width:'70%',
      paddingHorizontal:10,
      marginTop:15
    },
    textContent:{
      fontSize:25,
      fontWeight:'400'
    },
    card:{
      height:100,
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
    text:{
      color:'#850842',
      fontSize:22, 
      fontWeight:'bold'
    },
    makeBuy:{
      backgroundColor:'#850842',
      borderRadius:15,
      color: 'white', 
      fontSize:19, 
      padding:2,
      marginTop:-1,
      
    }
  });

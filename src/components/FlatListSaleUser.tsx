import React, { useEffect , useState} from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSales } from '../hooks/useSales';
import { ViewSale } from './ViewSale';
import { Estado } from '../interfaces/appIterfaces';
import { useNavigation } from '@react-navigation/native';
import { PedidoAlone } from './PedidoAlone';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props{
  params:  string, 
  datos: any;
}

export const FlatListSaleUser = ({params, datos}:Props) => {

  const navigation =useNavigation();

  return (
    <View style={{backgroundColor:'white'}}>
    <FlatList
        data={datos}
        numColumns={1}
        ListFooterComponent={
          <View style={{height:110}}></View>
        }
        keyExtractor={(sale)=> sale._id}
        renderItem={({item})=> 
        <View style={styles.container}>
          {
                item.datos === 'Pagado' ? (
                   <>
                       
                      <TouchableOpacity 
                      style={styles.card}
                      onPress={()=> navigation.navigate('PedidoAlone',{ id: item._id, name:item.producto_nombre})}
                      >
                        
                          <ViewSale sale={item}/>
                      </TouchableOpacity>
                   </>
                ) : 
                (
                  <View style={styles.card}>
                    
                    <ViewSale sale={item}/>
                  </View>
                )
          }
            
        </View>
      }
        showsVerticalScrollIndicator={false}
    />  
    </View>
  )
}


const styles = StyleSheet.create({ 
  
 
    container:{
      backgroundColor:'white',
      width:'95%',
      paddingHorizontal:10,
      marginTop:15,
      marginLeft:10
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

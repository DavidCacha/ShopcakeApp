import React, { useEffect , useState} from 'react';
import { Dimensions, FlatList, Image, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSales } from '../hooks/useSales';
import { ViewSale } from './ViewSale';
import { Estado } from '../interfaces/appIterfaces';
import { useNavigation } from '@react-navigation/native';
import { PedidoAlone } from './PedidoAlone';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchSale } from './SearchSale';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props{
  params:  string, 
  datos: any;
}

const screenWidth =  Dimensions.get('window').width;

export const FlatListSaleAdmin = ({params, datos}:Props) => {
    const {top} =  useSafeAreaInsets();


    const [term, setTerm] = useState('');

  const navigation =useNavigation();

  return (
    <View style={{backgroundColor:'white'}}>
     <SearchSale 
      
      //refresh={refresData}
      onDebounce= {(value)=> setTerm(value)}
      style={{position:'absolute',
      zIndex:999, 
      left:10,
      width:screenWidth -20 ,
      top: (Platform.OS === 'ios') ? top : top + 10
        }}
        />
    <View style={{height:45}}></View> 
    <FlatList
        data={datos}
        numColumns={1}
        ListFooterComponent={
            <View style={{height:150}}></View>
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

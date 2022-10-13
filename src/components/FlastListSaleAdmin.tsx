import React, { useEffect , useState} from 'react';
import { Alert, Dimensions, FlatList, Image, Modal, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSales } from '../hooks/useSales';
import { ViewSale } from './ViewSale';
import { Estado } from '../interfaces/appIterfaces';
import { useNavigation } from '@react-navigation/native';
import { PedidoAlone } from './PedidoAlone';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchSale } from './SearchSale';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ViewSaleAdmin } from './ViewSaleAdmin';

interface Props{
  dataRefresh:any,
  params:  string, 
  datos: any;
}

const screenWidth =  Dimensions.get('window').width;

export const FlatListSaleAdmin = ({params, dataRefresh, datos}:Props) => {

  const [saleFiltered, setSaleFiltered] = useState<any[]>([]);


  const [modalVisible, setModalVisible] = useState(false);
  
  const {top} =  useSafeAreaInsets();
 
  const [term, setTerm] = useState('');

  useEffect(()=> {
    if(term.length === 0){
      return setSaleFiltered([]);
    }
    setSaleFiltered(
      datos.filter(
        (date:any) => date.solicitante.toLocaleLowerCase()
        .includes(term.toLocaleLowerCase())
      )
    );
  }, [term])
  return (
    <View style={{backgroundColor:'white'}}>
     <SearchSale 
      refresh={dataRefresh}
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
        data={term==='' ? datos : saleFiltered}
        numColumns={1}
        ListFooterComponent={
            <View style={{height:150}}></View>
        }
        keyExtractor={(sale)=> sale._id}
        renderItem={({item})=> 
        <View style={styles.container}>  
              <ViewSaleAdmin refresh={dataRefresh} sale={item}/>
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
  });

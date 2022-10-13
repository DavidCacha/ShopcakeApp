import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, Dimensions, Platform, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { useProducts } from '../hooks/useProducts';
import { Products, Sale } from '../interfaces/appIterfaces';
import { FlatListSaleUser } from './FlatListSaleUser';
import { SearchInputs } from './SearchInputs';
import { SearchSale } from './SearchSale';
import { FlatListSaleAdmin } from './FlastListSaleAdmin';

const screenWidth =  Dimensions.get('window').width;

interface Props{
  refresh:any,
  datos: any;
  params: string;
}

export const PedidoAdmin = ({params, refresh, datos}:Props) => {
  

  const [productFiltered, setProductFiltered] = useState<Products[]>([]);
  
  const {top} =  useSafeAreaInsets();

  const {simpleProductList, loadProducts} = useProducts();

  const [term, setTerm] = useState('');

  useEffect(() => {
  }, [])
  
  const refresData = () =>{
    refresh();
  }
  useEffect(()=> {
    if(term.length === 0){
      return setProductFiltered([]);
    }
    setProductFiltered(
      simpleProductList.filter(
        (producto) => producto.nombre.toLocaleLowerCase()
        .includes(term.toLocaleLowerCase())
      )
    );
  }, [term])
  
  return (
    <>
      {
        datos.length === 0 ? (
          <View style={{justifyContent:'center', alignItems:'center', marginTop:220}}>
            <Text style={{color:'#850642', fontWeight:'bold', fontSize:25, textAlign:'center'}}>No hay pedidos solicitados por el momento</Text>
          </View>
        ) : ( <FlatListSaleAdmin dataRefresh={refresData} params={params} datos={datos}/>)
      }      
    </>
  
  )
}


const styles =StyleSheet.create({
  term:{
    marginTop:50, 
    marginBottom:5
  },
  subTerm:{
    marginTop:25, marginBottom:15
  }
});
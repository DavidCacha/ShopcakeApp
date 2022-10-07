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
  datos: any;
  params: string;
}

export const PedidoAdmin = ({params, datos}:Props) => {
  //console.log(datos)
  const {rol}= useContext(AuthContext);

  

  const [productFiltered, setProductFiltered] = useState<Products[]>([]);
  
  const {top} =  useSafeAreaInsets();

  const {simpleProductList, loadProducts} = useProducts();

  const [term, setTerm] = useState('');

  console.log(params);
  console.log(datos)

  useEffect(() => {
  }, [])
  
  const refresData = () =>{
    loadProducts();
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
     
      <FlatListSaleAdmin params={params} datos={datos}/>
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
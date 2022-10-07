import React, { useState, useEffect, useContext } from 'react'
import { FlatList, Text, View, StyleSheet,  Platform, Dimensions } from 'react-native';
import { initialWindowMetrics, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductsAllUser } from '../components/ProductsAllUser';
import { SearchInputs } from '../components/SearchInputs';
import { useProducts } from '../hooks/useProducts';
import { Products } from '../interfaces/appIterfaces';
import { AuthContext } from '../context/AuthContext';
import { ProductsAllAdmin } from '../components/ProductAllAdmin';
const screenWidth =  Dimensions.get('window').width;

export const ProductosScreen = () => {

  const {rol}= useContext(AuthContext);

  const [productFiltered, setProductFiltered] = useState<Products[]>([]);
  
  const {top} =  useSafeAreaInsets();

  const {simpleProductList, loadProducts} = useProducts();

  const [term, setTerm] = useState('');


  useEffect(() => {
    loadProducts();
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
    <View style={{flex:1, backgroundColor:'white'}}>
      <SearchInputs 
       refresh={refresData}
       onDebounce= {(value)=> setTerm(value)}
       style={{position:'absolute',
       zIndex:999, 
       left:10,
       width:screenWidth -20 ,
       top: (Platform.OS === 'ios') ? top : top +10
   }}
      />
      <FlatList
    
      ListHeaderComponent={<View style={term === '' ? styles.subTerm : styles.term}><Text
      style={{fontSize:28, fontWeight:'bold', color:'#850642', marginLeft:10}}
      >
        {term}
        </Text></View>}
          data={term==='' ? simpleProductList : productFiltered}
          numColumns={2}
          ListFooterComponent={
            <View style={{height:25, width:'100%'}}></View>
          }
          keyExtractor={(product)=> product._id}
          renderItem={({item})=> 
          <>
          {
            rol === 'Cliente' ? (
              <ProductsAllUser producto={item}/>) : (
                <ProductsAllAdmin refresh={refresData} producto={item} image={item.image} nombre={item.nombre} id={item._id}/>
              )
          }
          </>
        }
          showsVerticalScrollIndicator={false}
      />    
    </View>
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


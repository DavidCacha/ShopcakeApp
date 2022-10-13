import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import { FlatListUser } from '../components/FlatListUser';
import { SearchInputs } from '../components/SearchInputs';
import { useProfile } from '../hooks/useProfile';

const screenWidth =  Dimensions.get('window').width;


export const PerfilesAdmin = () => {

  const {profiles} =useProfile('');
  const [term, setTerm] = useState('');
  const {top} =  useSafeAreaInsets();
  const [profilesFiltered, setProfileFiltered] = useState<any[]>([]);

  useEffect(()=> {
    if(term.length === 0){
      return setProfileFiltered([]);
    }
    setProfileFiltered(
      profiles.filter(
        (profile:any) => profile.nombre.toLocaleLowerCase()
        .includes(term.toLocaleLowerCase())
      )
    );
  }, [term])
  return (
    <View style={{flex:1, alignItems:'center', backgroundColor:'white', paddingHorizontal:10}}>
      <Text style={styles.title}>Perfiles registrados</Text>
      <SearchInputs 
       type='perfil'
       refresh={()=>(console.log('jo'))}
       onDebounce= {(value)=> setTerm(value)}
       style={{position:'absolute',
       zIndex:999, 
       left:10,
       width:screenWidth -20 ,
       top: (Platform.OS === 'ios') ? top : top +10
   }}
      />
      {
        profilesFiltered.length === 0 && term !== '' && (
          <View style={styles.viewProfile}>
            <Text style={styles.textProfile}>No hay perfiles que coincidan con el nombre</Text>
          </View>
        )
      }
      
          <FlatList
        data={term === '' ? profiles : profilesFiltered}
        numColumns={1}
        ListFooterComponent={
            <View style={{height:150}}></View>
        }
        keyExtractor={(profile)=> profile._id}
        renderItem={({item})=> 
        <View style={styles.container}>  
          <FlatListUser datos={item}/>
        </View>
      }
        showsVerticalScrollIndicator={false}
    />  
       
      
    </View>
  )
}

const styles = StyleSheet.create({
  viewProfile:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
  },
  textProfile:{
    color:'#850642',
    fontSize:18
  },
  container: {
      //width:'95%'
      padding:5,
      justifyContent:'center',
      alignItems:'center',
      marginTop:8
  },
  textBackground:{
      backgroundColor:'#F3F1F3',
      borderRadius:50,
      height:40,
      paddingHorizontal:20,
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row',
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,

      elevation: 24,
          }
      ,
      textInput:{
          flex:1,
          fontSize:18,
          top:2
          },
      title:{
        color:'#850842',
        fontSize:22,
        marginVertical:15
      }
      })


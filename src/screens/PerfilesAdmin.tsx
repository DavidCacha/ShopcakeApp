import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { FlatListUser } from '../components/FlatListUser';

export const PerfilesAdmin = () => {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    }
  ];
  
  const Item = ({ title }:any) => (
    <FlatListUser/>
  );

  const renderItem = ({ item }:any) => (
    <Item title={item.title} />
  );
  return (
    <View style={{flex:1, alignItems:'center', backgroundColor:'white', paddingHorizontal:10}}>
      <Text style={styles.title}>Perfiles registrados</Text>
      <View style={styles.textBackground}>
            <TextInput
            placeholder='Buscar usuarios'
            style={styles.textInput}
            autoCapitalize='none'
            autoCorrect={false}
            //value={textValue}
            //onChangeText={setTextValue}
            />
            <Icon
            name='search-circle-outline'
            size={30}
            color='grey'
            />
        </View>
       <ScrollView>
       <SafeAreaView style={styles.container}>
          <FlatList
          numColumns={1}
          style={{marginTop:-10}}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          />
       </SafeAreaView>
       </ScrollView>

       
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      //width:'95%'
      marginTop:25
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


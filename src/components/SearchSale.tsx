import React, { useDebugValue } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, StyleProp, ViewStyle, TextInput, TouchableOpacity, Modal, Alert, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { AddProduct } from './AddProduct';

interface Props {
    //refresh: any,
    onDebounce: (value:string) => void;
    style?: StyleProp<ViewStyle>
}

export const SearchSale = ({style, onDebounce}:Props) => {

    const [modalVisible, setModalVisible] = useState(false);

    const [textValue, setTextValue] = useState('');

    const deboncedValue = useDebounce( textValue , 1500);

    const closeModal = () => {
      setModalVisible(false);
    }
    
    useEffect(() => {
        onDebounce(deboncedValue)
    }, [deboncedValue])

  return (
    <View style={{...styles.container, ...style as any}}>
        <View style={styles.textBackground}>
            <TextInput
            
            placeholder='Filtrar pedido'
            placeholderTextColor='#850842'
            style={{...styles.textInput, color:'#850842'}}
            autoCapitalize='none'
            autoCorrect={false}
            value={textValue}
            onChangeText={setTextValue}
            />
            <Icon
            name='search-circle-outline'
            size={35}
            color='#850842'
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    close:{
      backgroundColor:'white',
      zIndex:999,
      marginTop:-20,
      marginRight:-345,
    },
    centeredView: {
        flex: 1,
        backgroundColor:'rgba(14, 8, 8, 0.64);',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 55
      },
      modalView: {
        margin: 20,
        width:'95%',
        height:560,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginTop:-15,
        marginBottom: 28,
        textAlign: "center",
        fontSize:25,
        color:'#850642'
      },
        add:{
            width:40, 
            height:40, 
            borderRadius:45, 
            alignItems:'center', 
            justifyContent:'center', 
            backgroundColor:'#850642', 
            position:'absolute', 
            right:-50
        },
        container: {
            backgroundColor:'transparent',
            height:50
        },
        textBackground:{
            
            backgroundColor:'#F3F1F3',
            borderRadius:50,
            height:40,
            width:'100%',
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
                }
    
        })

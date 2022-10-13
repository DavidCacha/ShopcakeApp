import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Pedidos } from '../screens/Pedidos';
import { PerfilScreen } from '../screens/PerfilScreen';
import { ProductosScreen } from '../screens/ProductosScreen';


export const TabNavigator = () => {

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      
      tabBarLabelStyle:{fontSize:14, fontWeight:'400', marginVertical:1},
      headerShown:false,
      tabBarActiveTintColor:'white',
      tabBarActiveBackgroundColor:'#850842',
      tabBarInactiveTintColor:'#850842',
      tabBarPressColor: 'red',
      
      tabBarShowIcon: true,
      tabBarIndicatorStyle: {
        backgroundColor: 'black',
        
        //color:'white'
      },
      tabBarStyle: {        
        elevation: 0,
      },
      tabBarIcon: ({color}) => {
        let iconName: string = '';
        switch (route.name) {
          case 'Productos':
            iconName = 'fast-food-outline';
            break;

          case 'Perfil':
            iconName = 'person';
            break;
          case 'Carrito/Pedidos':
            iconName = 'cart-outline';
            break;
          
        }
        return <Icon name={iconName} size={30} color={color}/>;
      },
    })}
  
  >
    
        <Tab.Screen name='Productos' component={ProductosScreen}/>
        <Tab.Screen name='Carrito/Pedidos' component={Pedidos}/>
        <Tab.Screen name='Perfil' component={PerfilScreen}/>
    </Tab.Navigator>
  )
}


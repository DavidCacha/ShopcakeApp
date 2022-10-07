import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { Pedidos } from '../screens/Pedidos';
import { PerfilScreen } from '../screens/PerfilScreen';
import { ProductosScreen } from '../screens/ProductosScreen';
import { PedidosAdmin } from '../screens/PedidosAdmin';
import { PerfilesAdmin } from '../screens/PerfilesAdmin';
import { ConfiguracionesScreen } from '../screens/ConfiguracionesScreen';
import { Graficas } from '../screens/Graficas';


export const TabNavigatorAdmin = () => {

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
        //en ios es shadowColor:"transparent"
        //backgroundColor:'#850842',
        
        elevation: 0,
      },
      tabBarIcon: ({color}) => {
        let iconName: string = '';
        switch (route.name) {
          case 'Configuraciones':
            iconName = 'settings-outline';
            break;

          case 'Perfiles':
            iconName = 'people-outline';
            break;
          case 'Pedidos':
            iconName = 'bookmark-outline';
            break;
          case 'Graficas':
            iconName = 'stats-chart-outline';
            break;
          case 'Productos':
          iconName = 'fast-food-outline';
          break;

        }
        return <Icon name={iconName} size={30} color={color}/>;
      },
    })}
  
  >
        <Tab.Screen name='Productos' component={PerfilScreen}/>
        <Tab.Screen name='Pedidos' component={PedidosAdmin}/>
        <Tab.Screen name='Perfiles' component={PerfilesAdmin}/>
        <Tab.Screen name='Configuraciones' component={ConfiguracionesScreen}/>
        <Tab.Screen name='Graficas' component={Graficas}/>
    </Tab.Navigator>
  )
}
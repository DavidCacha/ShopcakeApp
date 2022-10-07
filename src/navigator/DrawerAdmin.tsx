import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { ConfiguracionesScreen } from '../screens/ConfiguracionesScreen';
import { Graficas } from '../screens/Graficas';
import { PedidosAdmin } from '../screens/PedidosAdmin';
import { PerfilesAdmin } from '../screens/PerfilesAdmin';
import { ProductosScreen } from '../screens/ProductosScreen';

const Drawer = createDrawerNavigator();

export const DrawerAdmin = () => {
  
  return (
    <Drawer.Navigator
    
    screenOptions={{
      drawerStyle:{backgroundColor:'#850642'},
      
      drawerLabelStyle:{color:'white'},
      drawerActiveBackgroundColor: 'rgba(244, 249, 245,0.2)',
      headerTintColor: 'white',
      headerStyle: { backgroundColor: '#850642'} 
    
    }}
    >
        <Drawer.Screen  name='Productos' component={ProductosScreen}/>        
        <Drawer.Screen  name='Pedidos' component={PedidosAdmin}/>        
        <Drawer.Screen name='Perfiles' component={PerfilesAdmin}/>
        <Drawer.Screen name='Configuraciones' component={ConfiguracionesScreen}/>
        <Drawer.Screen name='Graficas' component={Graficas}/>
    </Drawer.Navigator>
  )
}

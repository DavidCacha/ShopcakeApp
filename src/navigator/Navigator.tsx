import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, {useState, useContext, useReducer, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import { ProductosScreen } from '../screens/ProductosScreen';
import { PerfilScreen } from '../screens/PerfilScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { TabNavigator } from './TabNavigator';
import { RegisterScreen } from '../screens/RegisterScreen';
import { TabNavigatorAdmin } from './TagNavigatorAdmin';
import { AuthContext } from '../context/AuthContext';
import { authReducer } from '../context/AuthReducer';
import { Usuario } from '../interfaces/appIterfaces';
import { ProfileEditUser } from '../components/ProfileEditUser';
import { ProfileUser } from '../components/ProfileUser';
import { PedidoAlone } from '../components/PedidoAlone';
import { DrawerAdmin } from './DrawerAdmin';
import { DrawerClient } from './DrawerClient';
import { Pedidos } from '../screens/Pedidos';

export const Navigator = () => {

    const Stack = createNativeStackNavigator();

    const {status,rol,user, token} = useContext(AuthContext);

  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false
    }}
    >
      {status !== 'authenticated' ? 
      (
          <>
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
          </>
      ):(
        <>
          {
            rol==='Cliente' && (
              <>
                
              <Stack.Screen name='DrawerNavigator' component={DrawerClient}/>
              <Stack.Screen name='PedidoAlone' component={PedidoAlone}/>
              <Stack.Screen name='ProfileEdit' component={ProfileEditUser}/>
              <Stack.Screen name= 'ProfileUser' component={ProfileUser}/>
              <Stack.Screen name='Productos' component={ProductosScreen}/>
              <Stack.Screen name='Carrito/Pedidos' component={Pedidos}/>

              </>
            )
          }
          {
            rol==='Administrador' && (
              <Stack.Screen name='DrawerAdmin' component={DrawerAdmin}/>
            )
          }
        </>
      )

      }
        
    </Stack.Navigator>
  )
}

import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { TabNavigator } from './src/navigator/TabNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProfileProvider } from './src/context/ProfileContext';



const AppState = ({children}:any) => {
  return(
    <AuthProvider>  
     
      {children}  
    </AuthProvider>
  )
}

const App = () => {
  
  return (
    <NavigationContainer>
      <AppState>
        <Navigator/>
      </AppState>
    </NavigationContainer>
  )
}
export default App;

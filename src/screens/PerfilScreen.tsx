import React, { useContext, useState } from 'react'
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { ProfileUser } from '../components/ProfileUser';
import { ProfileEditUser } from '../components/ProfileEditUser';



export const PerfilScreen = () => {

  const {user,logOut} = useContext(AuthContext);


  const {profile} = useProfile(user?.id)
  console.log(profile)
  
  return (
    <ScrollView>
      {
        profile && (
         <ProfileUser/> 
        )
      }
      {
        !profile && (
          <ProfileEditUser/>
        )
      }
      
    </ScrollView>
  )
}


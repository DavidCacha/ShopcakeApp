import React, {useState, useContext, useEffect} from 'react'
import { Profile, ProfileElement } from '../interfaces/appIterfaces';
import { createContext } from 'react';
import shopcakeApi from '../api/shopCake';
import { AuthContext } from './AuthContext';

type ProfileContextProps = {
  profile: ProfileElement[];
  loadProfile: () => Promise<void>;
}

export const ProfileContext = createContext({} as ProfileContextProps);

export const ProfileProvider = ({children}: any) => {

  const {user} = useContext(AuthContext);
  
  const [profile, setProfile] = useState<ProfileElement[]>([]);

  useEffect(() => {
    loadProfile()
  }, [])
  

  const loadProfile = async() => {
    const {data} = await shopcakeApi.get<Profile>('/profile_search/'+user?.nombre);
    setProfile(data.profiles);
  }
  
  return (
    <ProfileContext.Provider
    value={{profile, loadProfile}}
    >
      {children}
    </ProfileContext.Provider>
  )
}

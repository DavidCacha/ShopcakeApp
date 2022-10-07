import React, {useState, useEffect} from 'react';
import { ProfileElement, Profile, Profileresul, Product } from '../interfaces/appIterfaces';
import shopcakeApi from '../api/shopCake';

export const useProfile = (name: any) => {

  const [profile, setProfile] = useState<ProfileElement>({}as ProfileElement);
  const [saveProfile, setSaveProfile] = useState<Product>({}as Product);


  const loadProfile = async() => {
    const resp = await shopcakeApi.get<Profile>(`/profile_search/${name}`);
    setProfile(resp.data.profiles[0]);
  }

  const deleteProfile = async(id:string) => {
    
    const resp = await shopcakeApi.delete(`//delete_profile//${id}`);
    console.log(resp.data);
  }

  const updateProfile = async(profile: any) => {
    const id = profile._id;
    delete profile['_id'];
    delete profile['__v'];
    delete profile['image'];
    delete profile['date'];
    const resp = await shopcakeApi.put(`/update_profile/${id}`, profile);
   // console.log(resp.data);
  }

  const addProfiles = async(obj:any) => {
    const resp = await shopcakeApi.get<Profileresul>(`/save_profile/${obj}`);
    setSaveProfile(resp.data.product);
  }

  useEffect(()=>{
    loadProfile();
  }, [])

  return {
    profile, addProfiles, updateProfile
  }
}

import React, {useState, useEffect, useContext} from 'react';
import { ProfileElement, Profile, Profileresul, Product } from '../interfaces/appIterfaces';
import shopcakeApi from '../api/shopCake';
import { ProfileRespnse } from '../interfaces/interfaceProfile';
import { AuthContext } from '../context/AuthContext';
import { PerfilResponse, Perfiles } from '../interfaces/saleInterface';

export const useProfile = (name: any) => {

  const {user} = useContext(AuthContext);
  const [profile, setProfile] = useState<ProfileElement>({}as ProfileElement);
  const [saveProfile, setSaveProfile] = useState<Product>({}as Product);
  const [profiles, setProfiles] = useState<Perfiles[]>();

  const getprofiles = async() => {

    const resp = await shopcakeApi.get<PerfilResponse>(`/get_profiles`);
    setProfiles(resp.data.perfiles);
  }

  const getprofile = async(id:string) => {

    const resp = await shopcakeApi.get<ProfileRespnse>(`/get_profile/${id}`);
    setProfile(resp.data.profile);
  }
  const loadProfile = async() => {
    const resp = await shopcakeApi.get<Profile>(`/profile_search/${name}`);
    setProfile(resp.data.profiles[0]);
  }

  const deleteProfile = async(id:string) => {
    
    const resp = await shopcakeApi.delete(`//delete_profile//${id}`);
  }

  const updateProfile = async(profile: any) => {
    const id = profile._id;
    delete profile['_id'];
    delete profile['__v'];
    delete profile['image'];
    delete profile['date'];
    const resp = await shopcakeApi.put(`/update_profile/${id}`, profile);
   
  }

  const addProfiles = async(obj:any) => {
    const resp = await shopcakeApi.get<Profileresul>(`/save_profile/${obj}`);
    setSaveProfile(resp.data.product);
  }

  useEffect(()=>{
    getprofiles();
  },[])
  useEffect(()=>{
    loadProfile();
  }, [])
  return {
    profile, profiles, addProfiles, updateProfile, getprofile, 
  }
}

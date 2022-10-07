import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'http://10.0.2.2:4444/api';

const shopcakeApi = axios.create({baseURL: baseUrl, 
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
});

//console.log(shopcakeApi);

export default shopcakeApi;

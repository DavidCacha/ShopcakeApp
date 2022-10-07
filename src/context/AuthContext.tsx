import { createContext, useReducer, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Usuario, LoginResponse, LoginData, RegisterData, RegisterResponse } from '../interfaces/appIterfaces';
import { authReducer, AuthState } from "./AuthReducer";
import shopcakeApi from '../api/shopCake';


type AuthContextProps = {
    message?: string;
    rol:string,
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated'|'not-authenticated';
    singIn: (loginData: LoginData) => void;
    singUp: (registerData: RegisterData) => void;
    logOut: () => void;
    removeError: () => void;
}

const authInitialSate: AuthState = {
    rol:'',
    status:'checking',
    token:null,
    user:null,
    message:''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}:any) => {
    
    const [state, dispatch] = useReducer(authReducer, authInitialSate)
    {/*useEffect(()=> {
       checkToken();
    },[]);}
    
    {const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');
        if (!token) return dispatch({type:'notAuthenticated'});

        const resp = await shopcakeApi.get('/login');
        if(resp.status !== 200){
            return dispatch({type: 'notAuthenticated'});
        }
        await AsyncStorage.setItem('token', resp.data.token);
        dispatch({ 
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario,
                name: resp.data.name
            }
        });

    } */}
    const singIn = async({ correo, contraseña }: LoginData ) => {
        //console.log( correo, contraseña )
        try {  
            const { data } = await shopcakeApi.post<LoginResponse>('/login', { correo, contraseña });
            dispatch({ 
                type: 'signUp',
                payload: {
                    mensaje: data.mensaje,
                    user: data.usuario,
                    token:data.token,
                    rol: data.rol
                }
            });
            await AsyncStorage.setItem('token', data.token );
        } catch (error:any) {
            console.log(error)
            dispatch({ 
                type: 'addError', 
                payload: 'Información incorrecta'
            })
        }    
    };
    const singUp = async({nombre, correo, contraseña, usuario}: RegisterData) => {
        try {  
            const { data } = await shopcakeApi.post<RegisterResponse>('/register', { nombre, correo, contraseña, usuario });
            dispatch({ 
                type: 'register',
                payload: {
                    mensaje: data.mensaje,
                   
                }
            });
            console.log(data)
            //await AsyncStorage.setItem('token', data.token );
        } catch (error:any) {
            console.log(error.response.data)
            dispatch({ 
                type: 'addError', 
                payload: 'Información incorrecta'
            })
        }    
    };
    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };
    const removeError=  () => {
        dispatch({type: 'removeError'});
    };

    return(
        <AuthContext.Provider value={{
            ...state,
            singIn,
            singUp, 
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
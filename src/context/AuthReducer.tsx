import { Usuario } from '../interfaces/appIterfaces';

export interface AuthState {
    status: 'checking' | 'authenticated'|'not-authenticated';
    token: string | null;
    user: Usuario|null;
    //name:string;
    rol:string,
    message: string;
}

export type AuthAction = 
    | {type:'signUp', payload: {mensaje: string, user: Usuario, token:string, rol:string}}
    | {type:'addError', payload: string}
    | {type:'register', payload: {mensaje:string}}
    | {type:'removeError'}
    | {type:'logout'}
    | {type:'notAuthenticated'}

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                message: action.payload
            }
    
        case 'removeError':
            return {
                ...state,
                message: ''
            };

        case 'signUp':
            
            return {
                ...state,
                message: action.payload.mensaje,
                status: 'authenticated',
                token: action.payload.token,
                rol:action.payload.rol,
                user: action.payload.user,
                //name: action.payload.name
            }
        case 'register':
            
            return {
                ...state,
                message: action.payload.mensaje,
                
            }
        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null
            }

        default:
            return state;
    }
}
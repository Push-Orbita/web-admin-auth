import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserEntity } from './interface/user.entity';

// Define el estado inicial
const initialStateAuth: UserEntity = {
  userNombre: '',
  organizacion: '',
  plan: '',
  sistema: '',
  isLogged: false,
  tokenUser: '',
  refreshToken: '',
  tokenSistem: '',
  activo: false,
  lang: 'es',
  userModulos: []
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialStateAuth,
  reducers: {
    LogOut: () => initialStateAuth,
    setClientToken: (state, action: PayloadAction<string>) => {
      state.tokenSistem = action.payload;
    },
    setUserToken: (state, action: PayloadAction<UserEntity>) => {
      return {
        ...state,
        userNombre: action.payload.userNombre,
        organizacion: action.payload.organizacion,
        tokenUser: action.payload.tokenUser,
        refreshToken: action.payload.refreshToken || state.refreshToken,
        tokenSistem: action.payload.tokenSistem || state.tokenSistem,
        sistema: action.payload.sistema,
        isLogged: true,
        activo: action.payload.activo,
        plan: action.payload.plan,
        userModulos: action.payload.userModulos
      };
    },
    clearTokens: (state) => {
      state.tokenUser = '';
      state.refreshToken = '';
      state.tokenSistem = '';
    }
  },
});

export const { setUserToken, LogOut, setClientToken, clearTokens } = authSlice.actions;

export default authSlice.reducer;

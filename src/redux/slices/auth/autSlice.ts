import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { UserEntity } from "./interface/user.entity";


// Define the initial state using that type
const initialStateAuth: UserEntity = {
  userNombre: '',
  organizacion: '',
  plan: '',
  sistema: '',
  isLogged: false,
  tokenUser: '',
  activo: false,
  userModulos: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {

    LogOut: () => initialStateAuth,
    setUserToken: (state, action: PayloadAction<UserEntity>) => {
      return {
        ...state,
        userNombre: action.payload.userNombre,
        organizacion: action.payload.organizacion,
        tokenUser: action.payload.tokenUser,
        sistema: action.payload.sistema,
        isLogged: true,
        activo: action.payload.activo,
        plan: action.payload.plan,
        userModulos: action.payload.userModulos
      };
    },
  },
})

  ;


export const { setUserToken, LogOut } = authSlice.actions;

export default authSlice.reducer;

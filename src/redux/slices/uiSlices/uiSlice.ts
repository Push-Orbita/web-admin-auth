import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Define a type for the slice state
interface IUi {
  theme: string;
  borderRadius: number;
  elevation: number;
  isLoadingAplications: boolean;
  isCollapsed: boolean;
  isOpenMenu: boolean;
  drawerWidth: number;
}

// Define the initial state using that type
const initialState: IUi = {
  theme: "light",
  borderRadius: 1,
  elevation: 4,
  isLoadingAplications: false,
  isCollapsed: false,
  isOpenMenu: false,
  drawerWidth:240,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    OpenMenu: (state)=>{
      state.isOpenMenu = !state.isOpenMenu
    },
    ElevationValue: (state, action: PayloadAction<number>)=>{
      state.elevation =  action.payload;
    },
    BorderValue: (state, action: PayloadAction<number>)=>{
      state.borderRadius = action.payload;
    }
  },
});

export const { OpenMenu,ElevationValue,BorderValue } = uiSlice.actions;

export default uiSlice.reducer;

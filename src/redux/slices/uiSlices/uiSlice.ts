import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUi {
  theme: boolean;
  borderRadius: number;
  elevation: number;
  isLoadingAplications: boolean;
  isCollapsed: boolean;
  isOpenMenu: boolean;
  drawerWidth: number;
}

const initialState: IUi = {
  theme: false,
  borderRadius: 1,
  elevation: 4,
  isLoadingAplications: false,
  isCollapsed: false,
  isOpenMenu: false,
  drawerWidth: 240,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = !state.theme;
    },
    openMenu: (state) => {
      state.isOpenMenu = !state.isOpenMenu;
    },
    setElevation: (state, action: PayloadAction<number>) => {
      state.elevation = action.payload;
    },
    setBorderRadius: (state, action: PayloadAction<number>) => {
      state.borderRadius = action.payload;
    }
  },
});

// Export the actions
export const { toggleTheme, openMenu, setElevation, setBorderRadius } = uiSlice.actions;

// Export the reducer
export default uiSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface SignedState {
  selectedMode: string | null;
  jwt: string | null;
  selectedFile: string | null;
}

const initialState: SignedState = {
  selectedMode: null,
  jwt: null,
  selectedFile: null
};

export const signedSlice = createSlice({
  name: 'signed',
  initialState,
  reducers: {
    setSelectedMode: (state, action: PayloadAction<string | null>) => {
      state.selectedMode = action.payload;
    },
    setJWT: (state, action: PayloadAction<string | null>) => {
      state.jwt = action.payload;
    },
    setSelectedFile: (state, action: PayloadAction<string | null>) => {
      state.selectedFile = action.payload;
    }
  }
});

// Экспортируем селекторы
export const selectSelectedMode = (state: RootState) => state.signed.selectedMode;
export const selectJWT = (state: RootState) => state.signed.jwt;
export const selectFile = (state: RootState) => state.signed.selectedFile;


// Экспортируем действия
export const { setSelectedMode, setJWT, setSelectedFile } = signedSlice.actions;

export default signedSlice.reducer;

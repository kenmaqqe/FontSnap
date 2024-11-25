import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    Steps: 1, 
    anotherVariable: 0,
    firstButton: false,
    secondButton: false,
    images: null,
  },
  reducers: {
    setSteps: (state, action) => {
      state.Steps = action.payload; 
    },
    setFirstButton: (state, action) => {
      state.firstButton = action.payload; 
    },
    setSecondButton: (state, action) => {
      state.secondButton = action.payload; 
    },
    setAnotherVariable: (state, action) => {
      state.anotherVariable = action.payload; 
    },
    setImages : (state, action) => {
      state.images = action.payload;
    },
  },
});

export const { setSteps, setFirstButton, setSecondButton, setAnotherVariable, setImages } = dataSlice.actions; // Експортуємо дії
export default dataSlice.reducer;

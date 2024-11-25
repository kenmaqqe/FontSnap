import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    Steps: 1, 
    anotherVariable: 0,
    firstButton: false,
    secondButton: false,
    images: null,
    textForSearch: '',
    textBoxes: [],
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
    setTextForSearch : (state, action) => {
      state.textForSearch = action.payload;
    },
    setTextBoxes : (state, action) => {
      state.textBoxes = action.payload;
    }
  },
});

export const { setSteps, setFirstButton, setSecondButton, setAnotherVariable, setImages, setTextForSearch , setTextBoxes } = dataSlice.actions; // Експортуємо дії
export default dataSlice.reducer;

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ApiClient from '../../../services/connection/ApiClient';

const utilitySlice = createSlice({
  name: 'utility',
  initialState: {
    area: 0,
    m3: 0,
    depth: 0,
    length: 0,
    width: 0,
    dosage: 0,
    gravel: 0,
    sand: 0,
    water: 0,
    count: 0,
    lengthWindow1: 0,
    widthWindow1: 0,
    lengthWindow2: 0,
    widthWindow2: 0,
    complement: '',
    thinnerType: '',
    typePainting: '',
    tool: '',
    countPainting: 0,
    countDiluent: 0,
    performancePainting: 0,
  },
  reducers: {
    setMeasures: (state, action) => {
      state.area = action.payload?.area;
      state.m3 = action.payload?.m3;
      state.depth = action.payload?.depth;
      state.length = action.payload?.length;
      state.width = action.payload?.width;
      state.dosage = action.payload?.dosage;
      state.gravel = action.payload?.gravel;
      state.sand = action.payload?.sand;
      state.water = action.payload?.water;
      state.count = action.payload?.count;
      state.lengthWindow1 = action.payload?.lengthWindow1;
      state.widthWindow1 = action.payload?.widthWindow1;
      state.lengthWindow2 = action.payload?.lengthWindow2;
      state.widthWindow2 = action.payload?.widthWindow2;
      state.complement = action.payload?.complement;
      state.thinnerType = action.payload?.thinnerType;
      state.typePainting = action.payload?.typePainting;
      state.tool = action.payload?.tool;
      state.countPainting = action.payload?.countPainting;
      state.countDiluent = action.payload?.countDiluent;
      state.performancePainting = action.payload?.performancePainting;
    },
  },
});

export const {setMeasures} = utilitySlice.actions;
export default utilitySlice.reducer;

import {configureStore} from '@reduxjs/toolkit';
import projectReducer from './features/Projects/projectSlice';
import authReducer from './features/Auth/authSlice';
import roomsReducer from './features/Rooms/roomSlice';
import cubagesReducer from './features/Cubages/cubagesSlice';
import construcionTypeReducer from './features/ConstructionType/constructionTypeSlice';
import constructionReducer from './features/Construction/constructionSlice';
import utilityReducer from './features/Utility/utilitySlice';

export default configureStore({
  reducer: {
    project: projectReducer,
    auth: authReducer,
    room: roomsReducer,
    cubages: cubagesReducer,
    construction: constructionReducer,
    constructionType: construcionTypeReducer,
    utility: utilityReducer,
  },
  devTools: true,
});

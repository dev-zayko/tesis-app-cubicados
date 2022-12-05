import {configureStore} from '@reduxjs/toolkit';
import projectReducer from './features/Projects/projectSlice';
import authReducer from './features/Auth/authSlice';
import roomsReducer from './features/Rooms/roomSlice';
import cubagesReducer from './features/Cubages/cubagesSlice';
import construcionTypeReducer from './features/ConstructionType/constructionTypeSlice';
import constructionReducer from './features/Construction/constructionSlice';
import utilityReducer from './features/Utility/utilitySlice';
import locationReducer from './features/Location/locationSlice';
import storeReducer from './features/Stores/storesSlice';
import quoterReducer from './features/Quoter/quoterSlice';
import materialReducer from './features/Material/materialSlice';
import membershipsReducer from './features/Memberships/membershipsSlice';
import webpayReducer from './features/Webpay/webpaySlice';

export default configureStore({
  reducer: {
    project: projectReducer,
    auth: authReducer,
    room: roomsReducer,
    cubages: cubagesReducer,
    construction: constructionReducer,
    constructionType: construcionTypeReducer,
    utility: utilityReducer,
    location: locationReducer,
    store: storeReducer,
    products: quoterReducer,
    material: materialReducer,
    memberships: membershipsReducer,
    webpay: webpayReducer
  },
  devTools: true,
});

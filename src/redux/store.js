import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import moreRepoReducer from './slices/MoreRepoSlice';
import homeReducer from './slices/homePageSlice';
import home2Reducer from './slices/homeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    reports: moreRepoReducer,
    home: homeReducer,
    home2:home2Reducer,
  },
});

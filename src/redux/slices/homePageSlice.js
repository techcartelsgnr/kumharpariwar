import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import commanServices from '../services/commanServices';
import reportServices from '../services/reportServices';

const initialState = {
  pending: false,
  pendingNext: false,
  error: false,
  price: 200,
  images: [],
  businesscatArray: [],
  subCatArray: [],
  ourProudArray: [],
  currentPageOurProudListing: 1,
  nextPageOurProudListing: null,
  prevPageOurProudListing: null,
  SubCatListingArray: [],
  currentPageSubCatListing: 1,
  nextPageSubCatListing: null,
  prevPageSubCatListing: null,
};
export const fetchSlider = createAsyncThunk(
  'home/Slider',
  async ({token}, thunkAPI) => {
    try {
      const response = await commanServices.getSlider({token});
      return response;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Fetch Business categories
export const fetchBusinessCategories = createAsyncThunk(
  'home/fetchBusinessCategories',
  async ({token}, thunkAPI) => {
    try {
      console.log('homepageslice htting');
      return await commanServices.businessCategory({token});
    } catch (e) {
      console.log('incatch homepage');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// sub category
export const fetchSubCategory = createAsyncThunk(
  'home/sub_category',
  async ({token, business_id}, thunkAPI) => {
    try {
      return await commanServices.subCategory({token, business_id});
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// contact by subcategory
export const fetchListingBySubCat = createAsyncThunk(
  'home/fetchListingBySubCat',
  async ({token, subcat_id}, thunkAPI) => {
    try {
      const {currentPageSubCatListing} = thunkAPI.getState().home;
      const response = await reportServices.fetchListingBySubCat({
        token,
        subcat_id,
        currentPageSubCatListing,
      });
      return response;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// contact by subcategory
export const fetchOurProud = createAsyncThunk(
  'home/fetchOurProud',
  async ({token, subcat_id}, thunkAPI) => {
    try {
      const {currentPageSubCatListing} = thunkAPI.getState().home;
      const response = await reportServices.fetchOurProud({
        token,
        currentPageSubCatListing,
      });
      return response;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const homePageSlice = createSlice({
  name: 'HomePage',
  initialState: initialState,
  reducers: {
    resetSlider: state => {
      console.log('in Reset images');
      state.images = [];
    },
    resetSubListing: state => {
      state.SubCatListingArray = [];
      state.currentPageSubCatListing = 1;
      state.nextPageSubCatListing = '';
      state.pending = false;
    },
    resetProud: state => {
      state.ourProudArray = [];
      state.currentPageOurProudListing = 1;
      state.nextPageOurProudListing = null;
      state.prevPageOurProudListing = null;
    },
  },
  
  extraReducers: builder => {
    builder.addCase(fetchSlider.pending, (state, action) => {
      state.pending = true;
    });
    builder.addCase(fetchSlider.fulfilled, (state, action) => {
      console.log('Slider =>');
      console.log(action.payload);
      state.images = action.payload.images;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchSlider.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });

    ////////////////////////fetch Business categories////////////////////////
    builder.addCase(fetchBusinessCategories.pending, (state, action) => {
      state.pending = true;
    });
    builder.addCase(fetchBusinessCategories.fulfilled, (state, action) => {
      console.log(
        'm hu yhaaxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' +
          JSON.stringify(action.payload),
      );
      state.businesscatArray = [...action.payload];
      console.log(state.businesscatArray);
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchBusinessCategories.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });

    ////////////////////////fetchSubCategory////////////////////////
    builder.addCase(fetchSubCategory.pending, (state, action) => {
      state.pending = true;
    });
    builder.addCase(fetchSubCategory.fulfilled, (state, action) => {
      console.log('From slice =>' + JSON.stringify(action.payload));
      state.subCatArray = [...action.payload];
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchSubCategory.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      console.log(action.payload);
    });
    ////////////////////////////////////Fetch All Listing By Sub Cat////////////////////////////////////////
    builder.addCase(fetchListingBySubCat.pending, (state, action) => {
      state.pending = true;
    });
    builder.addCase(fetchListingBySubCat.fulfilled, (state, action) => {
      console.log(action.payload.contacts);
      state.SubCatListingArray = [
        ...state.SubCatListingArray,
        ...action.payload.contacts.data,
      ];
      state.currentPageSubCatListing += 1;
      state.nextPageSubCatListing = action.payload.contacts.next_page_url;
      state.prevPageSubCatListing = action.payload.contacts.prev_page_url;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchListingBySubCat.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      console.log(action.payload);
    });
    ////////////////////////////////////Fetch Our Proud////////////////////////////////////////
    builder.addCase(fetchOurProud.pending, (state, action) => {
      state.pending = true;
    });
    builder.addCase(fetchOurProud.fulfilled, (state, action) => {
      console.log(action.payload.prouds);
      state.ourProudArray = [
        ...state.ourProudArray,
        ...action.payload.prouds.data,
      ];
      state.currentPageOurProudListing += 1;
      state.nextPageOurProudListing = action.payload.prouds.next_page_url;
      state.prevPageOurProudListing = action.payload.prouds.prev_page_url;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchOurProud.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      console.log(action.payload);
    });
  },
});

export const {resetSlider, resetSubListing, resetProud} = homePageSlice.actions;
export default homePageSlice.reducer;

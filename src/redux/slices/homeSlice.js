import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  businessCategory,
  fetchListingBySubCat,
  fetchNews,
  fetchOurProud,
  getAllGuestHouse,
  getAllHostal,
  getSearchResults,
  getSlider,
  newsFetchByUser,
  subCategory,
} from '../services/homeProvider';

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

//   SLIDER
export const fetchSliderSlice = createAsyncThunk(
  'home/fetchSliderSlice',
  async (_, thunkAPI) => {
    try {
      const response = await getSlider();
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
export const fetchBusinessCategoriesSlice = createAsyncThunk(
  'home/fetchBusinessCategoriesSlice',
  async (_, thunkAPI) => {
    try {
      const res = await businessCategory();
      return res;
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
export const fetchSubCategorySlice = createAsyncThunk(
  'home/fetchSubCategorySlice',
  async (business_id, thunkAPI) => {
    try {
      return await subCategory(business_id);
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
export const fetchListingBySubCatSlice = createAsyncThunk(
  'home/fetchListingBySubCatSlice',
  async ({subcat_id, page = 1}, thunkAPI) => {
    try {
      console.log('fetchListingBySubCatSlice page ==>', page);
      const response = await fetchListingBySubCat(subcat_id, page);
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
export const fetchOurProudSlice = createAsyncThunk(
  'home/fetchOurProudSlice',
  async (page, thunkAPI) => {
    console.log('find page number===>', page);
    try {
      // const {currentPageSubCatListing} = thunkAPI.getState().home;
      const response = await fetchOurProud(page);
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

// news
export const fetchNewsSlice = createAsyncThunk(
  'home/fetchNewsSlice',
  async (page, thunkAPI) => {
    try {
      const response = await fetchNews(page);
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

// news
export const fetchNewsByUserSlice = createAsyncThunk(
  'home/fetchNewsByUserSlice',
  async (page, thunkAPI) => {
    console.log('page number in news fetch', page);
    try {
      const response = await newsFetchByUser(page);
      return response;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      console.log('ERRO IN SLICE NEWS FETCH', e);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// GET ALL GUEST HOUSE
export const getAllGuestHouseSlice = createAsyncThunk(
  'home/getAllGuestHouseSlice',
  async (page, thunkAPI) => {
    console.log('page number in news fetch', page);
    try {
      const response = await getAllGuestHouse(page);
      return response;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      console.log('ERRO IN SLICE NEWS FETCH', e);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
// GET ALL HOSTAL
export const getAllHostalSlice = createAsyncThunk(
  'home/getAllHostalSlice',
  async (page, thunkAPI) => {
    console.log('page number in news fetch', page);
    try {
      const response = await getAllHostal(page);
      return response;
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      console.log('ERRO IN SLICE NEWS FETCH', e);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// search keyword
export const fetchSearchResultsSlice = createAsyncThunk(
  'home/fetchSearchResultsSlice',
  async ({keyword, city_id, category_id, page}, thunkAPI) => {
    try {
      const res = await getSearchResults({
        keyword: keyword,
        city_id: city_id,
        category_id: category_id,
        page: page,
      });

      return res;
    } catch (e) {
      console.log('in catch');
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);



export const homeSlice = createSlice({
  name: 'HomePage',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {},
});

export const {} = homeSlice.actions;
export default homeSlice.reducer;

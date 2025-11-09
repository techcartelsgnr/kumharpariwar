import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import reportServices from '../services/reportServices';
import commanServices from '../services/commanServices';

const initialState = {
  pending: false,
  error: false,
  notifications: [],
  terms: '',
  cities: '',
  aboutus: '',
  refundpolicy: '',
  privacypolicy: '',
  referMessage: '',
  thoughtOfTheDay: '',
  allresults: [],
  SubCatListingArray: [],
  currentPage: 1,
  currentPageSubCatListing: 1,
  nextPageSubCatListing: null,
  prevPageSubCatListing: null,
  allContacts: [],
  currentPageContactListing: 1,
  nextPageContactListing: null,
  prevPageContactListing: null,
  allNewsByUser: [],
  currentPageNewsListing: 1,
  nextPageNewsListing: null,
  prevPageNewsListing: null,
  newsDetailById: {},
   gallery: [],
};

// terms & conditions
export const fetchTerms = createAsyncThunk(
  'moreRepo/Terms',
  async ({token}, thunkAPI) => {
    try {
      return await reportServices.getTerms({
        token: token,
      });
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
// about us
export const fetchAbout = createAsyncThunk(
  'moreRepo/About',
  async ({token}, thunkAPI) => {
    try {
      return await reportServices.getAbout({
        token: token,
      });
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
// Refund Policy
export const fetchRefund = createAsyncThunk(
  'moreRepo/Refund',
  async ({token}, thunkAPI) => {
    try {
      return await reportServices.getRefund({
        token: token,
      });
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
// Refund Policy
export const fetchPrivacy = createAsyncThunk(
  'moreRepo/Privacy',
  async ({token}, thunkAPI) => {
    try {
      return await reportServices.getPrivacy({
        token: token,
      });
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

export const fetchNotifications = createAsyncThunk(
  'moreRepo/Notifications',
  async ({token}, thunkAPI) => {
    try {
      return await reportServices.getNotifications({token});
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
// reffer message
export const fetchReferMessage = createAsyncThunk(
  'moreRepo/referMessage',
  async ({token}, thunkAPI) => {
    try {
      return await reportServices.getReferMessage({
        token: token,
      });
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
// thoughts of the day
export const fetchThoughtOfTheDay = createAsyncThunk(
  'moreRepo/thoughtOfTheDay',
  async ({token}, thunkAPI) => {
    try {
      return await reportServices.getThoughtOfTheDay({
        token: token,
      });
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
// search keyword
export const fetchSearchResults = createAsyncThunk(
  'moreRepo/fetchSearchResults',
  async ({token, keyword, city_id, category_id, isPressed}, thunkAPI) => {
    try {
      const {dispatch, getState} = thunkAPI;
      const {currentPage} = getState().reports;

      let newPage = currentPage;

      if (isPressed) {
        newPage = 1;
        dispatch(resetAllSearchResult());
        dispatch(resetCurrentPage(newPage)); 
      }
      console.log('-------------------------', newPage);
      console.log('-------------------------', isPressed);
      return await reportServices.getSearchResults({
        token: token,
        keyword: keyword,
        city_id: city_id,
        category_id: category_id,
        page: newPage,
      });
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
// news
export const fetchNews = createAsyncThunk(
  'home/fetchNews',
  async ({token}, thunkAPI) => {
    try {
      const {currentPageSubCatListing} = thunkAPI.getState().reports;
      const response = await reportServices.fetchNews({
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

// news
export const fetchNewsByUser = createAsyncThunk(
  'home/fetchNewsByUser',
  async ({token}, thunkAPI) => {
    try {
      const {currentPageNewsListing} = thunkAPI.getState().reports;
      const response = await reportServices.fetchNewsByUser({
        token,
        currentPageNewsListing,
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

// cities
export const fetchCities = createAsyncThunk(
  'moreRepo/Cities',
  async ({token}, thunkAPI) => {
    try {
      return await reportServices.getCities({
        token: token,
      });
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

// add contact 
export const addContact = createAsyncThunk(
  'moreRepo/AddContact',
  async ({token, data}, thunkAPI) => {
    try {
      return await reportServices.addContactToDirectory({
        token: token,
        data: data
      });
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

// add contact 
export const fetchMycontacts = createAsyncThunk(
  'moreRepo/FetchContacts',
  async ({token}, thunkAPI) => {
    try {
      const {currentPageContactListing} = thunkAPI.getState().reports;
      return await reportServices.getContacts({
        token: token,
        page: currentPageContactListing,
      });
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

// add contact 
export const addNews = createAsyncThunk(
  'moreRepo/AddNews',
  async ({token, data}, thunkAPI) => {
    try {
      return await reportServices.addNews({
        token: token,
        data: data
      });
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

//Delete news
export const deleteNewsByUser = createAsyncThunk(
  'moreRepo/DeleteNewsByUser',
  async ({token, news_id}, thunkAPI) => {
    try {
      return await reportServices.deleteNewsByUser({token, news_id});
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

// add contact 
export const updateNewsByUser = createAsyncThunk(
  'moreRepo/UpdateNewsByUser',
  async ({token, data}, thunkAPI) => {
    try {
      return await reportServices.updateNewsByUser({
        token: token,
        data: data
      });
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

export const newsById = createAsyncThunk(
  'moreRepo/newsById',
  async ({token, news_id}, thunkAPI) => {
    try {
      return await reportServices.newsById({token, news_id});
    } catch (e) {
      const message =
        (e.response && e.response.data && e.response.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const getGallery = createAsyncThunk(
  'gallery/getGallery',
  async ({ token }, thunkAPI) => {
    try {
      const res = await reportServices.getGallery({ token });
      return res.data;
    } catch (e) {
      const message =
        e.response?.data?.message || e.message || e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const MoreRepoSlice = createSlice({
  name: 'MoreRepo',
  initialState: initialState,
  reducers: {
    resetSubListing: state => {
      state.SubCatListingArray = [];
      state.currentPageSubCatListing = 1;
      state.currentPage = 1;
      state.nextPageSubCatListing = '';
      state.pending = false;
    },
    resetCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    resetAllSearchResult: state => {
      state.allresults = [];
    },  
    resetContactsList(state) {
      state.allContacts = [];
      state.currentPageContactListing = 1;
      state.nextPageContactListing = null;
      state.prevPageContactListing = null;
    },
    resetNewsByUser: state => {
      state.allNewsByUser = [];
      state.currentPageNewsListing = 1;
      state.nextPageNewsListing = null;
      state.prevPageNewsListing = null;
    }
  },

  extraReducers: builder => {
    /////////////////////// ------Terms Message----- /////////////////////////////
    builder.addCase(fetchTerms.pending, (state, action) => {
      state.pending = true;
      state.error = false;
    });
    builder.addCase(fetchTerms.fulfilled, (state, action) => {
      //   console.log(action.payload.data);
      state.terms = action.payload.data;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchTerms.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });

    /////////////////////// ------Cities----- /////////////////////////////
    builder.addCase(fetchCities.pending, (state, action) => {
      state.pending = true;
      state.error = false;
    });
    builder.addCase(fetchCities.fulfilled, (state, action) => {
      state.cities = action.payload.data.cities;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchCities.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });

    /////////////////////// ------About Message----- /////////////////////////////
    builder.addCase(fetchAbout.pending, (state, action) => {
      state.pending = true;
      state.error = false;
    });
    builder.addCase(fetchAbout.fulfilled, (state, action) => {
      //   console.log(action.payload.data);
      state.aboutus = action.payload.data;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchAbout.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });

    /////////////////////// ------Refund Policy Message----- /////////////////////////////
    builder.addCase(fetchRefund.pending, (state, action) => {
      state.pending = true;
      state.error = false;
    });
    builder.addCase(fetchRefund.fulfilled, (state, action) => {
      //   console.log(action.payload.data);
      state.refundpolicy = action.payload.data;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchRefund.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });

    /////////////////////// ------Privacy Policy Message----- /////////////////////////////
    builder.addCase(fetchPrivacy.pending, (state, action) => {
      state.pending = true;
      state.error = false;
    });
    builder.addCase(fetchPrivacy.fulfilled, (state, action) => {
      //   console.log(action.payload.data);
      state.privacypolicy = action.payload.data;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchPrivacy.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });

    /////////////////////// ------Notifications Message----- /////////////////////////////
    builder.addCase(fetchNotifications.pending, (state, action) => {
      state.pending = true;
      state.error = false;
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      //   console.log(action.payload.data);
      state.notifications = action.payload.data;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });
    /////////////////////// ------Refer Message----- /////////////////////////////
    builder.addCase(fetchReferMessage.pending, (state, action) => {
      state.pending = true;
      state.error = false;
    });
    builder.addCase(fetchReferMessage.fulfilled, (state, action) => {
      //   console.log(action.payload.data);
      state.referMessage = action.payload.data;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchReferMessage.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });
    /////////////////////// ------Refer Message----- /////////////////////////////
    builder.addCase(fetchThoughtOfTheDay.pending, (state, action) => {
      state.pending = true;
      state.error = false;
    });
    builder.addCase(fetchThoughtOfTheDay.fulfilled, (state, action) => {
      //   console.log(action.payload.data);
      state.thoughtOfTheDay = action.payload.data;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchThoughtOfTheDay.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });
    /////////////////////// ------Search keyword----- /////////////////////////////
    builder.addCase(fetchSearchResults.pending, (state, action) => {
      state.pending = true;
      // state.allresults = [];
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      console.log('Reached here -----------------', state.currentPage);
      console.log('Via Date=>' + action.payload.contacts.first_page_url);
      state.allresults = [...state.allresults, ...action.payload.contacts.data];
      state.currentPage += 1;
      state.nextPageLink = action.payload.contacts.next_page_url;

      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      console.log('No Page Found here -----------------', state.currentPage);
      state.pending = false;
      state.error = true;
      //   state.currentPage = null;
    });
    ////////////////////////////////////Fetch News////////////////////////////////////////
    builder.addCase(fetchNewsByUser.pending, (state, action) => {
      state.pending = true;
    });
    builder.addCase(fetchNewsByUser.fulfilled, (state, action) => {
      console.log('here newsxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      console.log(action.payload.news);
      state.allNewsByUser = [
        ...state.allNewsByUser,
        ...action.payload.news.data,
      ];

      state.currentPageNewsListing += 1;
      state.nextPageNewsListing = action.payload.news.next_page_url;
      state.prevPageNewsListing = action.payload.news.prev_page_url;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchNewsByUser.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      console.log(action.payload);
    });

    ////////////////////////////////////Fetch News By User////////////////////////////////////////
    builder.addCase(fetchNews.pending, (state, action) => {
      state.pending = true;
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      console.log('here newsxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      console.log(action.payload.news);
      state.SubCatListingArray = [
        ...state.SubCatListingArray,
        ...action.payload.news.data,
      ];

      state.currentPageSubCatListing += 1;
      state.nextPageSubCatListing = action.payload.news.next_page_url;
      state.prevPageSubCatListing = action.payload.news.prev_page_url;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      console.log(action.payload);
    });

    /////////////////////////////////////Add Contact to Directory////////////////////////////
    builder.addCase(addContact.pending, (state, action) => {
      state.pending = true;
      state.error = false;
      console.log('Pending State: ', state.pending, state.error);
    });
    builder.addCase(addContact.fulfilled, (state, action) => {
      if (action.payload.message){
        state.pending = false;
        state.error = false;
        console.log('Add Contact Message=>' + action.payload.message);
        commanServices.showToast(action.payload.message);
        console.log('Fulfilled State: ', state.pending, state.error);
      }
      if (action.payload.errors){
        state.pending = false;
        state.error = true;
        console.log('Add Contact Message=>' + action.payload.errors);
        commanServices.showToast(action.payload.errors);
        console.log('Error State: ', state.pending, state.error);
      }
    });
    builder.addCase(addContact.rejected, (state, action) => {
      state.error = true;
      state.pending = false;
      console.log('Message=>' + action.payload);
      commanServices.showToast(action.payload.errors);
      console.log('Fulfilled Error State: ', state.pending, state.error);
    });
    ////////////////////////////////////Get Contacts////////////////////////////////////////
    builder.addCase(fetchMycontacts.pending, (state, action) => {
      state.pending = true;
    });
    builder.addCase(fetchMycontacts.fulfilled, (state, action) => {
      console.log('here my contatssssssssssssssssssss');
      console.log(action.payload.data.mycontact); 
      state.allContacts = [
        ...state.allContacts,
        ...action.payload.data.mycontact.data,
      ];

      state.currentPageContactListing += 1;
      state.nextPageContactListing = action.payload.data.mycontact.next_page_url; 
      console.log('Next page Url------------------', state.nextPageContactListing);
      state.prevPageContactListing = action.payload.data.mycontact.prev_page_url;
      state.pending = false;
      state.error = false;
    });
    builder.addCase(fetchMycontacts.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
      console.log(action.payload);
    });
    /////////////////////////////////////Add News/////////////////////////////
    builder.addCase(addNews.pending, (state, action) => {
      state.pending = true;
      state.error = false;
      console.log('Pending State: ', state.pending, state.error);
    });
    builder.addCase(addNews.fulfilled, (state, action) => {
      if (action.payload.message){
        state.pending = false;
        state.error = false;
        console.log('Add News Message=>' + action.payload.message);
        commanServices.showToast(action.payload.message);
        console.log('Fulfilled State: ', state.pending, state.error);
      }
      if (action.payload.errors){
        state.pending = false;
        state.error = true;
        console.log('Add News Message=>' + action.payload.errors);
        commanServices.showToast(action.payload.errors);
        console.log('Error State: ', state.pending, state.error);
      }
    });
    builder.addCase(addNews.rejected, (state, action) => {
      state.error = true;
      state.pending = false;
      console.log('Message=>' + action.payload);
      commanServices.showToast(action.payload.errors);
      console.log('Fulfilled Error State: ', state.pending, state.error);
    });
     /////////////////////////////////////Delete News By User/////////////////////////////
     builder.addCase(deleteNewsByUser.pending, (state, action) => {
      state.pending = true;
      state.error = false;
      console.log('Pending State: ', state.pending, state.error);
    });
    builder.addCase(deleteNewsByUser.fulfilled, (state, action) => {
      console.log('--------------------------------', action.payload)
      if (action.payload.message){
        state.pending = false;
        state.error = false;
        console.log('Delete News Message=>' + action.payload.message);
        commanServices.showToast(action.payload.message);
        console.log('Fulfilled State: ', state.pending, state.error);
      }
      if (action.payload.errors){
        state.pending = false;
        state.error = true;
        console.log('Delete News Message=>' + action.payload.errors);
        commanServices.showToast(action.payload.errors);
        console.log('Error State: ', state.pending, state.error);
      }
    });
    builder.addCase(deleteNewsByUser.rejected, (state, action) => {
      state.error = true;
      state.pending = false;
      console.log('Delete News Message=>' + action.payload);
      commanServices.showToast(action.payload.errors);
      console.log('Fulfilled Error State: ', state.pending, state.error);
    });
    /////////////////////////////////////Update News By User/////////////////////////////
    builder.addCase(updateNewsByUser.pending, (state, action) => {
      state.pending = true;
      state.error = false;
      console.log('Pending State: ', state.pending, state.error);
    });
    builder.addCase(updateNewsByUser.fulfilled, (state, action) => {
      console.log('--------------------------------', action.payload)
      if (action.payload.message){
        state.pending = false;
        state.error = false;
        console.log('Delete News Message=>' + action.payload.message);
        commanServices.showToast(action.payload.message);
        console.log('Fulfilled State: ', state.pending, state.error);
      }
      if (action.payload.errors){
        state.pending = false;
        state.error = true;
        console.log('Delete News Message=>' + action.payload.errors);
        commanServices.showToast(action.payload.errors);
        console.log('Error State: ', state.pending, state.error);
      }
    });
    builder.addCase(updateNewsByUser.rejected, (state, action) => {
      state.error = true;
      state.pending = false;
      console.log('Delete News Message=>' + action.payload);
      commanServices.showToast(action.payload.errors);
      console.log('Fulfilled Error State: ', state.pending, state.error);
    });
    //////////////////////✖✖✖✖✖✖✖✖✖ 🚥 News By Id 🚥 ✖✖✖✖✖✖✖✖✖✖✖/////////////////////
    builder.addCase(newsById.pending, (state, action) => {
      state.pending = true;
      state.error = false;
    });
    builder.addCase(newsById.fulfilled, (state, action) => {
      if(action.payload.status_code === 200){
        state.newsDetailById = action.payload.data.news[0];
        console.log('Responsed News =>', action.payload.data.news[0]);
      }
      // commanServices.showToast(action.payload.message);
      state.pending = false;
      state.error = false;
    });
    builder.addCase(newsById.rejected, (state, action) => {
      state.pending = false;
      state.error = true;
    });
     builder.addCase(getGallery.pending, (state) => {
        state.loading = true;
      })
      builder.addCase(getGallery.fulfilled, (state, action) => {
        state.loading = false;
        state.gallery = action.payload;
      })
      builder.addCase(getGallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {resetCurrentPage, resetAllSearchResult, resetContactsList, resetNewsByUser} = MoreRepoSlice.actions;
export default MoreRepoSlice.reducer;
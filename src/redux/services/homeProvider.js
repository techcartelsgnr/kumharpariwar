import api from './axiosConfig';

export const getSlider = async () => {
  const res = await api.get(`/get_slider`);
  return res.data;
};

// get_businesscategory
export const businessCategory = async () => {
  try {
    const res = await api.get(`/get_businesscategory`);
    return res.data;
  } catch (error) {
    console.log('ERROR IN BUSINESSCATEGOR', error);
  }
};

// get_sub_category
export const subCategory = async business_id => {
  console.log('bussine id', business_id);
  try {
    const res = await api.get(`/get_businesssubcategory/${business_id}`);
    return res.data;
  } catch (error) {
    console.log('ERROR IN SUB CATEGORY', error);
  }
};

// fetch contact list subcate
export const fetchListingBySubCat = async (subcat_id, page) => {
  console.log('fetchListingBySubCat page ==>', page);
  const res = await api.get(
    `/contacts_by_subcategory/${subcat_id}?users=${page}`,
  );

  return res.data;

  // if (res.data.errors === undefined) {
  // }
  // commanServices.showToast("Image info can't be fetch");
};

// fetch News
export const fetchNews = async page => {
  console.log('news page==> ', page);
  const res = await api.get(`/news?users=${page}`);
  return res.data;
};

// fetch Our Proud
export const fetchOurProud = async page => {
  const res = await api.get(`/our_proud?users=${page}`);
  return res.data;
};

// fetch News
export const newsFetchByUser = async page => {
  try {
    console.log('newsFetchByUser', page);
    const res = await api.get(`/news_added_by_user?users=${page}`);
    console.log('From News  =>' + res.data.data);
    return res.data;
  } catch (error) {
    console.log('ERROR IN newsFetchByUser ', error);
  }
};
// fetch ALL GUEST HOUSE
export const getAllGuestHouse = async page => {
  try {
    console.log('newsFetchByUser', page);
    const res = await api.get(`/get_guesthouses?users=${page}`);
    console.log('From News  =>' + res.data.data);
    return res.data;
  } catch (error) {
    console.log('ERROR IN newsFetchByUser ', error);
  }
};
// fetch ALL HOSTAL
export const getAllHostal = async page => {
  try {
    console.log('getAllHostal====>', page);
    const res = await api.get(`/get_hostel?users=${page}`);
    console.log('From News  =>' , res.data.data);
    return res.data;
  } catch (error) {
    console.log('ERROR IN newsFetchByUser ', error);
  }
};

// search by city, category and keyword
export const getSearchResults = async ({
  keyword,
  city_id,
  category_id,
  page,
}) => {
  console.log('page =>' + page);
  const res = await api.post(
    `/contact_search?page=${page}`,
    {
      keyword: keyword,
      city_id: city_id,
      category_id: category_id,
    },
  );
  console.log('------------------------------------------------', res);
  return res.data;
};

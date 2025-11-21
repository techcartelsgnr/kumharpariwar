import axios from 'axios';

const repoAxios = axios.create({
  baseURL: 'https://kumharpariwar.com/api/',
  headers: {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

const getNotifications = async ({ token }) => {
  const res = await repoAxios.get(`/notification`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  console.log('res notificatiob', res)
  return res.data;
};

// terms & conditions
const getTerms = async ({ token }) => {
  //   console.log('page =>' + page);
  const res = await repoAxios.get(`/get_cmspage/terms-condition`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return res.data;
};

// about us
const getAbout = async ({ token }) => {
  //   console.log('page =>' + page);
  const res = await repoAxios.get(`/get_cmspage/about-us`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return res.data;
};
// refund policy
const getRefund = async ({ token }) => {
  //   console.log('page =>' + page);
  const res = await repoAxios.get(`/get_cmspage/refund-policy`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return res.data;
};

// privacy policy
const getPrivacy = async ({ token }) => {
  //   console.log('page =>' + page);
  const res = await repoAxios.get(`/get_cmspage/privacy-policy`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return res.data;
};

// fetch contact list subcate
const fetchListingBySubCat = async ({
  token,
  subcat_id,
  currentPageSubCatListing,
}) => {

  console.log('subcat_id =>' + subcat_id);
  console.log('currentPageSubCatListing =>' + currentPageSubCatListing);
  const res = await repoAxios.get(
    `/contacts_by_subcategory/${subcat_id}?users=${currentPageSubCatListing}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  console.log('From sub cat  =>' + res.data.data.contacts.data[0]);
  console.log("response====>", res.data)
  return res.data.data;
  // if (res.data.errors === undefined) {
  // }
  // commanServices.showToast("Image info can't be fetch");
};

// fetch Our Proud
const fetchOurProud = async ({ token, currentPageSubCatListing }) => {
  const res = await repoAxios.get(
    `/our_proud?users=${currentPageSubCatListing}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  console.log('From our Prouds  =>' + res.data.data.prouds.data[0]);
  return res.data.data;
  // if (res.data.errors === undefined) {
  // }
  // commanServices.showToast("Image info can't be fetch");
};

// fetch News
const fetchNews = async ({ token, currentPageSubCatListing }) => {
  const res = await repoAxios.get(`/news?users=${currentPageSubCatListing}`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  console.log('From News  =>' + res.data.data);
  return res.data.data;
};

// fetch News
const fetchNewsByUser = async ({ token, currentPageNewsListing }) => {
  const res = await repoAxios.get(
    `/news_added_by_user?users=${currentPageNewsListing}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  console.log('From News  =>' + res.data.data);
  return res.data.data;
};

// getreffermessage
const getReferMessage = async ({ token }) => {
  //   console.log('page =>' + page);
  const res = await repoAxios.get(`/referral_message`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return res.data;
};
// suvichar
// getreffermessage
const getThoughtOfTheDay = async ({ token }) => {
  //   console.log('page =>' + page);
  const res = await repoAxios.get(`/thought_of_theday`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  return res.data;
};

// search by city, category and keyword
const getSearchResults = async ({
  token,
  keyword,
  city_id,
  category_id,
  page,
}) => {
  console.log('page =>' + page);
  const res = await repoAxios.post(
    `/contact_search?page=${page}`,
    {
      keyword: keyword,
      city_id: city_id,
      category_id: category_id,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  console.log('------------------------------------------------', res);
  return res.data.data;
};

//get cities
const getCities = async ({ token }) => {
  const res = await repoAxios.get('/get_cities', {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  return res.data;
};

const addContactToDirectory = async ({ token, data }) => {
  const response = await axios({
    method: 'post',
    url: 'https://kumharpariwar.com/api/add_contact',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  });

  return response.data;
};

//contacts
const getContacts = async ({ token, page }) => {
  console.log('page =>' + page);
  const res = await repoAxios.get(`/my_contacts?users=${page}`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  console.log('res get contact', res)
  return res.data;
};

const addNews = async ({ token, data }) => {
  const response = await axios({
    method: 'post',
    url: 'https://kumharpariwar.com/api/addnews_by_user',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  });

  return response.data;
};

const deleteNewsByUser = async ({ token, news_id }) => {
  const res = await repoAxios.post(
    '/deletenews_by_user',
    {
      news_id: news_id
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  return res.data;
};

const updateNewsByUser = async ({ token, data }) => {
  const response = await axios({
    method: 'post',
    url: 'https://kumharpariwar.com/api/updatenews_by_user',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  });

  return response.data;
};

// suggestions
const newsById = async ({ token, news_id }) => {
  const response = await repoAxios.get(`/news_detail/${news_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  },
  );
  console.log('******************************', response.data);
  return response.data;
};

const getGallery = async ({ token }) => {
  const response = await repoAxios.get('/gallery', {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('Gallery API Response:', response.data);
  return response;
};
const getKarykerni = async ({ token }) => {
  const response = await repoAxios.get('/karyakarini', {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('getKarykerni API Response:', response.data);
  return response;
};
const getAllKarykerni = async ({ token, id }) => {
    const response = await repoAxios.get(`/karyakarini_members/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('getAllKarykerni API Response:', response.data);
    return response;
  };

const reportServices = {
  getNotifications,
  getTerms,
  getAbout,
  getRefund,
  getPrivacy,
  fetchListingBySubCat,
  getReferMessage,
  getThoughtOfTheDay,
  fetchOurProud,
  fetchNews,
  getSearchResults,
  getCities,
  addContactToDirectory,
  getContacts,
  addNews,
  fetchNewsByUser,
  deleteNewsByUser,
  updateNewsByUser,
  newsById,
  getGallery,
  getKarykerni,
  getAllKarykerni
};
export default reportServices;

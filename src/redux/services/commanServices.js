import axios from 'axios';
import Toast from 'react-native-toast-message';

const authAxios = axios.create({
  baseURL: 'https://kumharpariwar.com/api/',
  headers: {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

const getSlider = async ({token}) => {
  const imgArray = [{}];

  const res = await authAxios.get(`/get_slider`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  res.data.data.slider.map((object, index) => {
    console.log(object.image);
    imgArray[index] = {
      id: index,
      img: `https://kumharpariwar.com/storage/slider/${object.image}`,
    };
    console.log(imgArray);
  });
  console.log(imgArray);
  const data = {
    images: imgArray,
  };
  console.log('Slider Homepage');
  console.log(data);
  return data;
};

// get_businesscategory
const businessCategory = async ({token}) => {
  const categoryArray = [{}];

  const res = await authAxios.get(`/get_businesscategory`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  res.data.data.businesscategory.map((object, index) => {
    // console.log(object.icon);
    categoryArray[index] = {
      id: index,
      icon: `https://kumharpariwar.com/storage/businesscategory/${object.icon}`,
      name: object.name,
      business_id: object.id,
    };
    // console.log(categoryArray);
  });
  console.log('category called');
  console.log(categoryArray);
  return categoryArray;
};
// get_sub_category
const subCategory = async ({token, business_id}) => {
  const sub_cat_Array = [];

  const res = await authAxios.get(`/get_businesssubcategory/${business_id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Acess-Control-Allow-Origin': '*',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
  res.data.data.business_subcategory.map((object, index) => {
    // console.log(object.icon);
    sub_cat_Array[index] = {
      id: object.id,
      // icon: `https://oneganganagar.com/storage/businesscategory/${object.icon}`,
      name: object.title,
      business_id: object.business_id,
    };
    // console.log(categoryArray);
  });
  // console.log(imgArray);
  return sub_cat_Array;
};

const showToast = Message => {
  Toast.show({
    type: 'success',
    text1: Message,
    visibilityTime: 5000,
  });
};

const commanServices = {
  showToast,
  getSlider,
  businessCategory,
  subCategory,
};
export default commanServices;

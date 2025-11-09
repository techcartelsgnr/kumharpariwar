import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://kumharpariwar.synergixtechnologies.com/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get token from AsyncStorage
const getAuthToken = async () => {
  try {
    const userInfoString = await AsyncStorage.getItem('user_info');
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      return userInfo?.token || null;
    }
  } catch (error) {
    console.log('Error getting token from AsyncStorage', error);
  }
  return null;
};

// Request interceptor to add token
api.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: Handle 401 globally
      console.log('Unauthorized access - maybe redirect to login');
    }
    return Promise.reject(error);
  }
);

export default api;

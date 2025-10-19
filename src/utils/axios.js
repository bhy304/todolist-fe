import axios from 'axios';
import { Cookies } from 'universal-cookie';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const cookies = new Cookies();

// axios 인스턴스 설정
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키를 주고받기 위해 필요
});

//  요청 인터셉터
axiosInstance.interceptors.request.use(
  config => {
    const token = cookies.get('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('API 요청:', config.method.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error('요청 인터셉터 에러:', error);
    return Promise.reject(error);
  }
);

//  응답 인터셉터
axiosInstance.interceptors.response.use(
  response => {
    console.log('API 응답:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('응답 인터셉터 에러:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;

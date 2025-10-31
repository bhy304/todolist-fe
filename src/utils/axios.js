import axios from 'axios';
import Cookies from 'universal-cookie';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const cookies = new Cookies();

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = cookies.get('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    console.error('요청 인터셉터 에러:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.error('응답 인터셉터 에러:', error.response?.status, error.message);

    if (!error.response) {
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const errorCode = data?.errorCode;

    switch (status) {
      case 401:
        if (errorCode === 'TOKEN_EXPIRED') {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          cookies.remove('token', { path: '/' });
          localStorage.removeItem('user');
          window.location.href = '/';
        } else if (errorCode === 'TOKEN_MISSING') {
          alert('인증 토큰이 필요합니다.');
          cookies.remove('token', { path: '/' });
          localStorage.removeItem('user');
          window.location.href = '/';
        } else if (errorCode === 'TOKEN_INVALID') {
          alert('유효하지 않은 토큰입니다.');
          cookies.remove('token', { path: '/' });
          localStorage.removeItem('user');
          window.location.href = '/';
        } else if (errorCode === 'INVALID_CREDENTIALS') {
          return Promise.reject(error);
        }
        break;
      case 403:
        alert('접근 권한이 없습니다.');
        break;
      case 404:
        alert('요청하신 리소스를 찾을 수 없습니다.');
        break;
      case 409:
        return Promise.reject(error);
      case 500:
        alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        break;
      default:
        alert(data?.message || '오류가 발생했습니다.');
        break;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

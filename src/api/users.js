import axiosInstance from '../utils/axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const usersAPI = {
  login: async ({ username, password }) => {
    try {
      const response = await axiosInstance.post('/users/login', {
        username,
        password,
      });

      console.log('로그인 성공: ', response);
      return response;
    } catch (error) {
      console.error('로그인 실패: ', error);
      throw error;
    }
  },
  join: async ({ username, password }) => {
    try {
      const response = await axiosInstance.post('/users/join', {
        username,
        password,
      });

      console.log('회원가입 성공: ', response.status);

      return response;
    } catch (error) {
      console.error('회원가입 실패: ', error);
      throw error;
    }
  },
  logout: () => {
    cookies.remove('token', { path: '/' });
    localStorage.removeItem('user');
    window.location.href = '/';
  },
};

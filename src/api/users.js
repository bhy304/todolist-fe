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

      return response;
    } catch (error) {
      console.error('실패: ', error);
      throw error;
    }
  },
  join: async ({ username, password }) => {
    try {
      const response = await axiosInstance.post('/users/join', {
        username,
        password,
      });

      return response;
    } catch (error) {
      console.error('실패: ', error);
      throw error;
    }
  },
  logout: () => {
    cookies.remove('token', { path: '/' });
    localStorage.removeItem('user');
    window.location.href = '/';
  },
};

import axiosInstance from '../utils/axios';

export const teamTodosAPI = {
  getTeamTodos: async id => {
    try {
      const response = await axiosInstance.get(`/team/todos/${id}`);

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  createTeamTodo: async (id, { content }) => {
    try {
      const response = await axiosInstance.post(`/team/todos/${id}`, {
        content,
      });

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  updateTeamTodo: async (id, { content }) => {
    try {
      const response = await axiosInstance.put(`/team/todos/${id}`, {
        content,
      });

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  deleteTeamTodo: async id => {
    try {
      const response = await axiosInstance.delete(`/team/todos/${id}`);

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  toggleTeamTodo: async id => {
    try {
      const response = await axiosInstance.patch(`/team/todos/${id}/toggle`);

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
};

import axiosInstance from '../utils/axios';

export const todosAPI = {
  getTodos: async teamId => {
    try {
      const response = await axiosInstance.get(
        `${teamId ? `/todos?teamId=${teamId}` : '/todos'}`
      );

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  createTodo: async (teamId, { content }) => {
    try {
      const response = await axiosInstance.post(
        `${teamId ? `/todos?teamId=${teamId}` : '/todos'}`,
        {
          content,
        }
      );

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  updateTodo: async (id, teamId, { content, is_done }) => {
    try {
      const response = await axiosInstance.put(
        `${teamId ? `/todos/${id}?teamId=${teamId}` : `/todos/${id}}`}`,
        {
          content,
          is_done,
        }
      );

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  deleteTodo: async id => {
    try {
      const response = await axiosInstance.delete(`/todos/${id}`);

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
};

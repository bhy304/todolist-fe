import axiosInstance from '../utils/axios';

export const todosAPI = {
  // 모든 할 일 가져오기
  getTodos: async () => {
    try {
      const response = await axiosInstance.get('/todos');

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  // 할 일 추가
  createTodo: async ({ content }) => {
    try {
      const response = await axiosInstance.post('/todos', {
        content,
      });

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  // 할 일 수정
  updateTodo: async (id, { content }) => {
    try {
      const response = await axiosInstance.put(`/todos/${id}`, {
        content,
      });

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  // 할 일 삭제
  deleteTodo: async id => {
    try {
      const response = await axiosInstance.delete(`/todos/${id}`);

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  // 할 일 완료 상태 토글
  toggleTodo: async id => {
    try {
      const response = await axiosInstance.patch(`/todos/${id}/toggle`);

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
};

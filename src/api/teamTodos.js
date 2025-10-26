import axiosInstance from '../utils/axios';

export const teamTodosAPI = {
  getTeamTodos: async id => {
    try {
      const response = await axiosInstance.get(`/team/todos/${id}`);

      console.log('팀 할 일 목록 조회 성공:', response);
      return response;
    } catch (error) {
      console.error('팀 할 일 목록 조회 실패:', error);
      throw error;
    }
  },
  createTeamTodo: async (id, { content }) => {
    try {
      const response = await axiosInstance.post(`/team/todos/${id}`, {
        content,
      });

      console.log('팀 할 일 추가 성공:', response);
      return response;
    } catch (error) {
      console.error('팀 할 일 추가 실패:', error);
      throw error;
    }
  },
  updateTeamTodo: async (id, { content }) => {
    try {
      const response = await axiosInstance.put(`/team/todos/${id}`, {
        content,
      });

      console.log('팀 할 일 수정 성공:', response);
      return response;
    } catch (error) {
      console.error('팀 할 일 수정 실패:', error);
      throw error;
    }
  },
  deleteTeamTodo: async id => {
    try {
      const response = await axiosInstance.delete(`/team/todos/${id}`);

      console.log('팀 할 일 삭제 성공:', response);
      return response;
    } catch (error) {
      console.error('팀 할 일 삭제 실패:', error);
      throw error;
    }
  },
  toggleTeamTodo: async id => {
    try {
      const response = await axiosInstance.patch(`/team/todos/${id}/toggle`);

      console.log('팀 할 일 상태 변경 성공:', response);
      return response;
    } catch (error) {
      console.error('팀 할 일 상태 변경 실패:', error);
      throw error;
    }
  },
};

import axiosInstance from '../utils/axios';

export const teamsAPI = {
  // 팀 만들기
  createTeam: async ({ teamname }) => {
    try {
      const response = await axiosInstance.post('/teams', { teamname });

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  // 팀 삭제
  deleteTeam: async id => {
    try {
      const response = await axiosInstance.delete(`/teams/${id}`);

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  // 팀 초대 (팀원의 아이디를 입력해서 팀원 초대)
  inviteMember: async (id, { username }) => {
    try {
      const response = await axiosInstance.post(`/teams/${id}/members`, {
        username,
      });

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  // userId가 가지고 있는 팀 목록
  getTeams: async () => {
    try {
      const response = await axiosInstance.get('/teams');

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  // 팀원 삭제
  deleteTeamMember: async (teamId, memberId) => {
    try {
      const response = await axiosInstance.delete(
        `/teams/${teamId}/members/${memberId}`
      );

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  // 팀원 목록 조회
  getTeamMembers: async id => {
    try {
      const response = await axiosInstance.get(`/teams/${id}/members`);

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
};

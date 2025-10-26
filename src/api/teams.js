import axiosInstance from '../utils/axios';

export const teamsAPI = {
  // 팀 만들기
  createTeam: async ({ teamname }) => {
    try {
      const response = await axiosInstance.post('/teams', { teamname });

      console.log('할 일 목록 조회 성공:', response);
      return response;
    } catch (error) {
      console.error('할 일 목록 조회 실패:', error);
      throw error;
    }
  },
  // 팀 삭제
  deleteTeam: async id => {
    try {
      const response = await axiosInstance.delete(`/teams/${id}`);

      console.log('성공:', response);
      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  // 팀 초대 (팀원의 아이디를 입력해서 팀원 초대)
  inviteMember: async () => {
    try {
      const response = await axiosInstance.post('/teams/invite');

      console.log('성공:', response);
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

      console.log('성공:', response);
      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  // 팀원 삭제
  deleteTeamMember: async id => {
    try {
      const response = await axiosInstance.delete(`/teams/members/${id}`);

      console.log('성공:', response);
      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  // 팀원 목록 조회
  getTeamMembers: async id => {
    try {
      const response = await axiosInstance.get(`/teams/members/${id}`);

      console.log('성공:', response);
      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
};

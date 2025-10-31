import axiosInstance from '../utils/axios';

export const teamsAPI = {
  createTeam: async ({ teamname }) => {
    try {
      const response = await axiosInstance.post('/teams', { teamname });

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
  deleteTeam: async id => {
    try {
      const response = await axiosInstance.delete(`/teams/${id}`);

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
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
  getTeams: async () => {
    try {
      const response = await axiosInstance.get('/teams');

      return response;
    } catch (error) {
      console.error('실패:', error);
      throw error;
    }
  },
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

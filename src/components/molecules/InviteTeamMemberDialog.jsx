import './Dialog.css';
import { useState, useEffect } from 'react';
import { teamsAPI } from '../../api/teams';
import Button from '../atoms/Button';
import Textfield from '../atoms/Textfield';

const InviteTeamMemberDialog = ({ onConfirm, onCancel, isOpen, teamId }) => {
  if (!isOpen) return null;

  const user = JSON.parse(localStorage.getItem('user'));

  const [username, setUsername] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    getTeamMembers();
  }, []);

  const getTeamMembers = async () => {
    try {
      const response = await teamsAPI.getTeamMembers(teamId);
      console.log(response);

      setTeamMembers(
        response.data.data.filter(member => member.users_id !== user.id)
      );
      console.log(teamMembers);
    } catch (error) {
      console.error(error);
    }
  };

  const inviteMember = async username => {
    try {
      const response = await teamsAPI.inviteMember(teamId, { username });
      console.log(response);

      setUsername('');
      getTeamMembers();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTeamMember = async memberId => {
    try {
      await teamsAPI.deleteTeamMember(teamId, memberId);

      getTeamMembers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overlay">
      <div className="dialog" onClick={e => e.stopPropagation()}>
        <h2 className="dialog-title mb-20">팀원 초대하기</h2>
        <div className="dialog-input-group">
          <Textfield
            id="teams_id"
            name="teams_id"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="초대할 팀원의 아이디를 입력해주세요."
          />
          <Button variant="PRIMARY" onClick={() => inviteMember(username)}>
            초대
          </Button>
        </div>
        <ul className="dialog-member-list">
          {teamMembers.map(member => (
            <li key={member.id}>
              <span>{member.username}</span>
              <button onClick={() => deleteTeamMember(member.users_id)}>
                <img src="/trash.svg" alt="delete-button-img" />
              </button>
            </li>
          ))}
        </ul>
        <div className="dialog-button-group">
          <Button variant="GHOST" onClick={onCancel}>
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
};
export default InviteTeamMemberDialog;

import './Dialog.css';
import { useState } from 'react';
import { teamsAPI } from '../../api/teams';

import Button from '../atoms/Button';
import Textfield from '../atoms/Textfield';

const CreateTeamDialog = ({
  onConfirm,
  onCancel,
  isOpen,
  setIsCreateTeamOpen,
}) => {
  if (!isOpen) return null;

  const [teamname, setTeamname] = useState('');

  const createTeam = async teamname => {
    try {
      const response = await teamsAPI.createTeam({ teamname });
      console.log(response);

      setTeamname('');
      setIsCreateTeamOpen(false);
      onConfirm?.(); // 팀 생성 성공 시 onConfirm 콜백 호출
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="overlay">
      <div className="dialog" onClick={e => e.stopPropagation()}>
        <h2 className="dialog-title">팀 만들기</h2>
        <Textfield
          id="teamname"
          name="teamname"
          value={teamname}
          onChange={e => setTeamname(e.target.value)}
          placeholder="팀 이름을 입력해주세요."
        />
        <div className="dialog-button-group">
          <Button variant="PRIMARY" onClick={() => createTeam(teamname)}>
            만들기
          </Button>
          <Button variant="GHOST" onClick={onCancel}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateTeamDialog;

import { useState } from 'react';
import { teamsAPI } from '../../api/teams';
import Button from '../atoms/Button';
import Textfield from '../atoms/Textfield';
import Modal from '../atoms/Modal';

const CreateTeamDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  setIsCreateTeamOpen,
}) => {
  if (!isOpen) return null;

  const [teamname, setTeamname] = useState('');

  const createTeam = async teamname => {
    try {
      await teamsAPI.createTeam({ teamname });

      setTeamname('');
      setIsCreateTeamOpen(false);
      onConfirm?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal className="mb-20" title="팀 만들기">
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
    </Modal>
  );
};
export default CreateTeamDialog;

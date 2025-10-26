import './Dialog.css';
import Button from '../atoms/Button';
import Textfield from '../atoms/Textfield';

const CreateTeamDialog = ({ onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="dialog" onClick={e => e.stopPropagation()}>
        <h2 className="dialog-title">팀 만들기</h2>
        <Textfield
          id="teamname"
          name="teamname"
          onChange={() => {}}
          placeholder="팀 이름을 입력해주세요."
        />
        <div className="dialog-button-group">
          <Button variant="PRIMARY" onClick={onConfirm}>
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

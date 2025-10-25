import './InviteTeamMemberDialog.css';
import Button from '../atoms/Button';
import Textfield from '../atoms/Textfield';

const teamMembers = [
  { id: 1, username: 'person01' },
  { id: 2, username: 'person02' },
  { id: 3, username: 'person03' },
  { id: 4, username: 'person04' },
  { id: 5, username: 'person05' },
  { id: 6, username: 'person06' },
  { id: 7, username: 'person07' },
];

const InviteTeamMemberDialog = ({ onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="dialog" onClick={e => e.stopPropagation()}>
        <h2 className="dialog-title">팀원 초대하기</h2>
        <div className="dialog-input-group">
          <Textfield
            id="teams_id"
            name="teams_id"
            onChange={() => {}}
            placeholder="초대할 팀원의 아이디를 입력해주세요."
          />
          <Button variant="PRIMARY" onClick={onConfirm}>
            초대
          </Button>
        </div>
        <ul className="dialog-member-list">
          {teamMembers.map(member => (
            <li key={member.id}>
              <span>{member.username}</span>
              <button onClick={() => {}}>
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

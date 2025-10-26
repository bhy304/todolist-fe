import { useState } from 'react';
import './common.css';
// 공통 컴포넌트
import Button from '../../components/atoms/Button';
import Textfield from '../../components/atoms/Textfield';
import Checkfield from '../../components/atoms/Checkfield';
import AlertDialog from '../../components/molecules/AlertDialog';
import CreateTeamDialog from '../../components/molecules/CreateTeamDialog';
import InviteTeamMemberDialog from '../../components/molecules/InviteTeamMemberDialog';

const Common = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isInviteMemberOpen, setIsInviteMemberOpen] = useState(false);

  const handleClick = e => {
    alert('버튼이 클릭되었습니다.');
  };

  const handleChange = e => {
    console.log(e.target.value);
  };

  const handleToggle = e => {
    setIsChecked(e.target.checked);
  };

  const confirmDelete = () => {
    console.log('삭제');
    setIsAlertOpen(false);
  };

  return (
    <>
      <main className="main-container">
        <h1>공통 컴포넌트 페이지</h1>
        <p>이 페이지는 공통 컴포넌트를 테스트하기 위한 페이지입니다.</p>

        <div className="common">
          <Button variant="PRIMARY" onClick={handleClick}>
            등록하기
          </Button>
          <Button variant="PRIMARY_DISABLED">등록하기</Button>
          <Button variant="GHOST">수정</Button>
          <Button variant="SECONDARY">수정</Button>
          <Button variant="OUTLINE_DANGER" onClick={() => setIsAlertOpen(true)}>
            삭제
          </Button>
          <Button variant="DANGER">삭제</Button>
        </div>
        <div className="common">
          <Button variant="PRIMARY" size="FULL">
            FULL SIZE
          </Button>
        </div>
        {/* 다이얼로그 버튼 */}
        <div className="common">
          <Button variant="OUTLINE_DANGER" onClick={() => setIsAlertOpen(true)}>
            삭제
          </Button>
          <Button
            variant="GHOST"
            size="FULL"
            onClick={() => setIsCreateTeamOpen(true)}
          >
            팀 만들기
          </Button>
          <Button
            variant="PRIMARY"
            size="FULL"
            onClick={() => setIsInviteMemberOpen(true)}
          >
            초대하기
          </Button>
        </div>

        <div className="common textfield-group">
          <Textfield
            variant="DEFAULT"
            placeholder="할 일을 입력해주세요."
            onChange={handleChange}
          />
          <Textfield variant="FOCUS" placeholder="데브코스 강의 수강하기" />
          <Textfield variant="ERROR" placeholder="데브코스 강의 수강하기" />
        </div>

        <div className="common checkfield-group">
          <Checkfield
            label="데브코스 강의 수강하기"
            checked={isChecked}
            onChange={handleToggle}
          />
          <Checkfield label="데브코스 강의 수강하기" checked />
        </div>
      </main>
      {isAlertOpen && (
        <AlertDialog
          isOpen={isAlertOpen}
          title="정말 삭제하시겠습니까?"
          onConfirm={confirmDelete}
          onCancel={() => setIsAlertOpen(false)}
        />
      )}
      {isCreateTeamOpen && (
        <CreateTeamDialog
          isOpen={isCreateTeamOpen}
          title="정말 삭제하시겠습니까?"
          onConfirm={confirmDelete}
          onCancel={() => setIsCreateTeamOpen(false)}
        />
      )}
      {isInviteMemberOpen && (
        <InviteTeamMemberDialog
          isOpen={isInviteMemberOpen}
          title="정말 삭제하시겠습니까?"
          onConfirm={confirmDelete}
          onCancel={() => setIsInviteMemberOpen(false)}
        />
      )}
    </>
  );
};
export default Common;

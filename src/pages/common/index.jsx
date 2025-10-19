import { useState } from 'react';
import './common.css';
// 공통 컴포넌트
import Button from '../../shared/ui/atoms/Button';
import Textfield from '../../shared/ui/atoms/Textfield';
import Checkfield from '../../shared/ui/atoms/Checkfield';

const Common = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = e => {
    alert('버튼이 클릭되었습니다.');
  };

  const handleChange = e => {
    console.log(e.target.value);
  };

  const handleToggle = e => {
    setIsChecked(e.target.checked);
  };

  return (
    <main>
      <h1>공통 컴포넌트 페이지</h1>
      <p>이 페이지는 공통 컴포넌트를 테스트하기 위한 페이지입니다.</p>

      <div className="common">
        <Button variant="PRIMARY" onClick={handleClick}>
          등록하기
        </Button>
        <Button variant="PRIMARY_DISABLED">등록하기</Button>
        <Button variant="GHOST">수정</Button>
        <Button variant="SECONDARY">수정</Button>
        <Button variant="OUTLINE_DANGER">삭제</Button>
        <Button variant="DANGER">삭제</Button>
      </div>
      <div className="common">
        <Button variant="PRIMARY" size="FULL">
          FULL SIZE
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
  );
};
export default Common;

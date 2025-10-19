import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../auth.module.css';
import { usersAPI } from '../../../api/users';

import Textfield from '../../../shared/ui/atoms/Textfield';
import Button from '../../../shared/ui/atoms/Button';

const JoinPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => {
      const newForm = { ...prev, [name]: value };

      if (name === 'password' && name === 'passwordConfirm') {
        setPasswordError(newForm.password !== newForm.passwordConfirm);
      } else {
        setPasswordError(false);
      }

      return newForm;
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { username, password, passwordConfirm } = form;

    // 비밀번호 일치 검증
    if (password !== passwordConfirm) {
      setPasswordError(true);
      return;
    }

    try {
      const result = await usersAPI.join({ username, password });

      console.log('회원가입 성공:', result);

      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <main>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Textfield
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="아이디를 입력해주세요."
        />
        <Textfield
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요."
        />
        <Textfield
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          value={form.passwordConfirm}
          onChange={handleChange}
          required
          placeholder="비밀번호를 다시 입력해주세요."
        />
        {passwordError && (
          <span className={styles.errorMessage}>
            비밀번호가 일치하지 않습니다.
          </span>
        )}
        <Button type="submit" variant="PRIMARY" size="FULL">
          회원가입
        </Button>
      </form>
    </main>
  );
};

export default JoinPage;

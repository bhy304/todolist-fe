import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../auth.module.css';
import { usersAPI } from '../../../api/users';

import Button from '../../../shared/ui/atoms/Button';
import Textfield from '../../../shared/ui/atoms/Textfield';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [validationError, setValidationError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => {
      return { ...prev, [name]: value };
    });
    // 입력 시 에러 메시지 초기화
    setValidationError(false);
    setErrorMessage('');
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const { username, password } = form;

    if (!username || !password) {
      setValidationError(true);
      setErrorMessage('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const result = await usersAPI.login({ username, password });

      console.log('로그인 성공: ', result);

      navigate('/todo');
    } catch (error) {
      console.error('로그인 실패: ', error);

      // 401 에러 처리
      if (error.response?.status === 401) {
        setValidationError(true);
        setErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
      } else {
        setValidationError(true);
        setErrorMessage('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <main className={styles.login}>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h1>로그인</h1>
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
        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
        <Button type="submit" variant="PRIMARY" size="FULL">
          로그인
        </Button>
      </form>
      <Link to="/join" className={styles.join}>
        회원가입
      </Link>
    </main>
  );
};

export default LoginPage;

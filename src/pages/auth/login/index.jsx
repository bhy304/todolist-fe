import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import styles from '../auth.module.css';
import { usersAPI } from '../../../api/users';

import Button from '../../../shared/ui/atoms/Button';
import Textfield from '../../../shared/ui/atoms/Textfield';

const cookies = new Cookies();

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
      const response = await usersAPI.login({ username, password });

      console.log('로그인 성공:', response);

      if (response.data.success) {
        const { token, user } = response.data;
        console.log(token, user);

        // Cookie에 토큰 저장
        cookies.set('token', token, {
          path: '/',
          // maxAge: 3600, // 1시간
        });

        // 사용자 정보는 localStorage에 저장 (선택사항)
        localStorage.setItem('user', JSON.stringify(user));

        navigate('/todo');
      }
    } catch (error) {
      console.error('로그인 실패: ', error);

      // 401 에러 처리
      if (error.response?.data.errorCode === 'INVALID_CREDENTIALS') {
        setValidationError(true);
        setErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
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
          variant={validationError ? 'ERROR' : 'DEFAULT'}
          placeholder="아이디를 입력해주세요."
        />
        <Textfield
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          variant={validationError ? 'ERROR' : 'DEFAULT'}
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

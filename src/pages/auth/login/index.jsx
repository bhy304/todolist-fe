import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import styles from '../auth.module.css';
import { usersAPI } from '../../../api/users';

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

      // navigate('/todos');
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
    <main>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <input
          type="text"
          id="username"
          name="username"
          // required
          value={form.username}
          onChange={handleChange}
          className={validationError ? styles.error : ''}
          placeholder="아이디를 입력해주세요."
        />
        <input
          type="password"
          id="password"
          name="password"
          // required
          value={form.password}
          onChange={handleChange}
          className={validationError ? styles.error : ''}
          placeholder="비밀번호를 입력해주세요."
        />
        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
        <button type="submit">로그인</button>
      </form>
      <Link to="/join" className={styles.join}>
        회원가입
      </Link>
    </main>
  );
};

export default LoginPage;

/* 
1. 로그인, 회원가입 유효성 검사 
2. 로그인 성공시 Todos 페이지로 이동
3. 로그인시 토큰 로컬 스토리지에 저장
4. 토큰이 
*/

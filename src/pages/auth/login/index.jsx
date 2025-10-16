import { Link } from 'react-router';
import styles from '../auth.module.css';

const LoginPage = () => {
  return (
    <main>
      <form className={styles.authForm}>
        <h1>로그인</h1>
        <input
          type="text"
          id="username"
          name="username"
          required
          autoComplete="username"
          placeholder="아이디를 입력해주세요."
        />
        <input
          type="password"
          id="password"
          name="password"
          required
          autoComplete="username"
          placeholder="비밀번호를 입력해주세요."
        />
        <span className={styles.error}></span>
        <button type="submit">로그인</button>
      </form>
      <Link to="/join" className={styles.join}>
        회원가입
      </Link>
    </main>
  );
};

export default LoginPage;

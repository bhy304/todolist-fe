import styles from '../auth.module.css';

const JoinPage = () => {
  return (
    <main>
      <form className={styles.authForm}>
        <h1>회원가입</h1>
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
        <input
          type="password"
          id="password"
          name="password"
          required
          autoComplete="username"
          placeholder="비밀번호를 다시 입력해주세요."
        />
        <span className={styles.error}>비밀번호가 일치하지 않습니다.</span>
        <button type="submit">회원가입</button>
      </form>
    </main>
  );
};

export default JoinPage;

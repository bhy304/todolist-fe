import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import styles from '../auth.module.css';
import { usersAPI } from '../../../api/users';

import Button from '../../../shared/ui/atoms/Button';
import Textfield from '../../../shared/ui/atoms/Textfield';

const cookies = new Cookies();

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
  });

  const onSubmit = async formData => {
    const { username, password } = formData;

    try {
      const response = await usersAPI.login({ username, password });

      console.log('로그인 성공:', response);

      if (response.data.success) {
        const { token, user } = response.data;

        // Cookie에 토큰 저장
        cookies.set('token', token, {
          path: '/',
          // maxAge: 3600, // 1시간
        });

        // 사용자 정보는 localStorage에 저장
        localStorage.setItem('user', JSON.stringify(user));

        navigate('/todo');
      }
    } catch (error) {
      console.error('로그인 실패: ', error);

      // 401 에러 처리 react-hook-form 에러로 추가
      if (error.response?.data.errorCode === 'INVALID_CREDENTIALS') {
        setError('root.serverError', {
          type: 'manual',
          message: '아이디와 비밀번호를 확인해주세요.',
        });
      } else {
        setError('root.serverError', {
          type: 'manual',
          message: '로그인 중 오류가 발생했습니다. 다시 시도해주세요.',
        });
      }
    }
  };

  return (
    <main className={styles.login}>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <h1>로그인</h1>
        <Textfield
          id="username"
          name="username"
          placeholder="아이디를 입력해주세요."
          variant={
            errors.username || errors.root?.serverError ? 'ERROR' : 'DEFAULT'
          }
          {...register('username', {
            required: '아이디를 입력해주세요.',
          })}
        />
        <Textfield
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          variant={
            errors.password || errors.root?.serverError ? 'ERROR' : 'DEFAULT'
          }
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
          })}
        />
        {(errors.username || errors.password || errors.root?.serverError) && (
          <span className={styles.errorMessage}>
            {errors.root?.serverError?.message ||
              errors.username?.message ||
              errors.password?.message}
          </span>
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

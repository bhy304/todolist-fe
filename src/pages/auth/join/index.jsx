import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from '../auth.module.css';
import { usersAPI } from '../../../api/users';

import Textfield from '../../../shared/ui/atoms/Textfield';
import Button from '../../../shared/ui/atoms/Button';

const JoinPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange', // 실시간 검증
  });

  const password = watch('password'); // 비밀번호 필드 감시

  const onSubmit = async formData => {
    const { username, password } = formData;

    try {
      const result = await usersAPI.join({ username, password });

      console.log('회원가입 성공:', result);

      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/');
    } catch (error) {
      console.error('회원가입 실패:', error);

      if (error.response?.data.errorCode === 'DUPLICATE_USERNAME') {
        setError('username', {
          type: 'manual',
          message: '이미 사용 중인 아이디입니다.',
        });
      }
    }
  };

  return (
    <main>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <h1>회원가입</h1>
        <Textfield
          id="username"
          placeholder="아이디를 입력해주세요."
          variant={errors.username ? 'ERROR' : 'DEFAULT'}
          {...register('username', {
            required: '아이디를 입력해주세요.',
            minLength: {
              value: 4,
              message: '아이디는 4자 이상이어야 합니다.',
            },
            maxLength: {
              value: 20,
              message: '아이디는 20자 이내여야 합니다.',
            },
            pattern: {
              value: /^[a-zA-Z0-9_-]+$/,
              message:
                '아이디는 영문, 숫자, 밑줄(_), 대시(-)만 사용할 수 있습니다.',
            },
          })}
        />
        <Textfield
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요."
          variant={errors.password ? 'ERROR' : 'DEFAULT'}
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '비밀번호는 최소 8자 이상이어야 합니다.',
            },
            maxLength: {
              value: 20,
              message: '비밀번호는 20자 이내여야 합니다.',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).+$/,
              message: '비밀번호는 대소문자, 숫자, 특수문자를 포함해야 합니다.',
            },
          })}
        />
        <Textfield
          type="password"
          id="passwordConfirm"
          placeholder="비밀번호를 다시 입력해주세요."
          variant={errors.passwordConfirm ? 'ERROR' : 'DEFAULT'}
          {...register('passwordConfirm', {
            required: '비밀번호를 다시 입력해주세요.',
            validate: value =>
              value === password || '비밀번호가 일치하지 않습니다.',
          })}
        />
        {(errors.username || errors.password || errors.passwordConfirm) && (
          <span className={styles.errorMessage}>
            {errors.username?.message ||
              errors.password?.message ||
              errors.passwordConfirm?.message}
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

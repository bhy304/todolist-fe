import { useState } from 'react';
import './Textfield.css';
import { getClassName } from '../../utils/classNames';

const TEXTFIELD_VARIANTS = {
  DEFAULT: 'default',
  FOCUS: 'focus',
  ERROR: 'error',
};

const Textfield = ({
  id,
  name,
  type = 'text',
  variant = 'DEFAULT',
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  ...rest // react-hook-form의 register를 포함한 나머지 props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // 에러 상태가 아닐 때만 포커스 스타일 적용
  const currentVariant = variant === 'ERROR' ? 'ERROR' : isFocused ? 'FOCUS' : 'DEFAULT';
  const className = getClassName('input', currentVariant, TEXTFIELD_VARIANTS);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e); // 외부에서 전달된 onFocus가 있으면 실행
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e); // react-hook-form의 onBlur도 실행
  };

  return (
    <input
      {...rest} // register의 ref, onChange 등을 먼저 전달
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};
export default Textfield;

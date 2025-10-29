import { useState } from 'react';
import './Textfield.css';
import { getClassName } from '../../utils/classNames';

const TEXTFIELD_VARIANTS = {
  DEFAULT: 'default',
  FOCUS: 'focus',
  ERROR: 'error',
};

const Textfield = props => {
  const { variant, type, onBlur, onFocus } = props;

  const [isFocused, setIsFocused] = useState(false);

  const currentVariant =
    variant === 'ERROR' ? 'ERROR' : isFocused ? 'FOCUS' : 'DEFAULT';
  const className = getClassName('input', currentVariant, TEXTFIELD_VARIANTS);

  const handleFocus = e => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = e => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <input
      {...props}
      type={type || 'text'}
      className={className}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};
export default Textfield;

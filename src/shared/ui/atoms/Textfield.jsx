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
  placeholder,
  ...rest // react-hook-form의 register를 포함한 나머지 props
}) => {
  const className = getClassName('input', variant, TEXTFIELD_VARIANTS);

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      {...rest} // register의 ref, onBlur 등을 자동으로 전달
    />
  );
};
export default Textfield;

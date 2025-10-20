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
    />
  );
};
export default Textfield;

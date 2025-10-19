import './Textfield.css';
import { getClassName } from '../../utils/classNames';

const TextfieldType = {
  DEFAULT: 'default',
  FOCUS: 'focus',
  ERROR: 'error',
};

const Textfield = ({ children, id, name, type, onChange, placeholder }) => {
  const className = getClassName('input', type, TextfieldType);

  return (
    <input
      type="text"
      id={id}
      name={name}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
    >
      {children}
    </input>
  );
};
export default Textfield;

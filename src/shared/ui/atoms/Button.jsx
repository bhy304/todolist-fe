import './Button.css';
import { getClassName } from '../../utils/classNames';

const ButtonType = {
  PRIMARY: 'primary',
  PRIMARY_DISABLED: 'primary-disabled',
  GHOST: 'ghost',
  SECONDARY: 'secondary',
  OUTLINE_DANGER: 'outline-danger',
  DANGER: 'danger',
};

const Button = ({ children, type, onClick }) => {
  const className = getClassName('button', type, ButtonType);

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;

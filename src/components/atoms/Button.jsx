import './Button.css';
import { getClassName } from '../../utils/classNames';

const BUTTON_VARIANTS = {
  PRIMARY: 'primary',
  PRIMARY_DISABLED: 'primary-disabled',
  GHOST: 'ghost',
  SECONDARY: 'secondary',
  OUTLINE_DANGER: 'outline-danger',
  DANGER: 'danger',
};

const BUTTON_SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  FULL: 'full',
};

const Button = ({ children, type, variant, size, onClick }) => {
  const className = getClassName(
    'button',
    [variant, size],
    [BUTTON_VARIANTS, BUTTON_SIZE]
  );

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;

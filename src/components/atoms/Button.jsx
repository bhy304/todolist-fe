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

const Button = props => {
  const { children, size, variant } = props;

  const className = getClassName(
    'button',
    [variant, size],
    [BUTTON_VARIANTS, BUTTON_SIZE]
  );

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};
export default Button;

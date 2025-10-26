import { useId } from 'react';
import './Checkfield.css';

const Checkfield = ({
  id,
  name,
  label,
  onChange,
  checked = false,
  disabled = false,
}) => {
  const generatedId = useId();
  const checkboxId = id || generatedId;

  return (
    <div className="checkfield">
      <input
        type="checkbox"
        id={checkboxId}
        name={name || checkboxId}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={checkboxId}>{label}</label>
    </div>
  );
};
export default Checkfield;

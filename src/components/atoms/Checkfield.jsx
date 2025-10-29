import { useId } from 'react';
import './Checkfield.css';

const Checkfield = props => {
  const { id, name, label } = props;

  const generatedId = useId();
  const checkboxId = id || generatedId;

  return (
    <div className="checkfield">
      <input
        {...props}
        type="checkbox"
        id={checkboxId}
        name={name || checkboxId}
      />
      <label htmlFor={checkboxId}>{label}</label>
    </div>
  );
};
export default Checkfield;

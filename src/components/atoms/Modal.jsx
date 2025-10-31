import './Modal.css';

const Modal = ({ title, className, children }) => {
  return (
    <div className="overlay">
      <div className="dialog" onClick={e => e.stopPropagation()}>
        <h2 className={`dialog-title ${className}`}>{title}</h2>
        {children}
      </div>
    </div>
  );
};
export default Modal;

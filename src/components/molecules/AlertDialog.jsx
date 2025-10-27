import './Dialog.css';
import Button from '../atoms/Button';

const AlertDialog = ({ title, onConfirm, onCancel, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="dialog" onClick={e => e.stopPropagation()}>
        <h2 className="dialog-title mb-60">{title}</h2>
        <div className="dialog-button-group">
          <Button variant="PRIMARY" onClick={onConfirm}>
            확인
          </Button>
          <Button variant="GHOST" onClick={onCancel}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AlertDialog;

import Button from '../atoms/Button';
import Modal from '../atoms/Modal';

const AlertDialog = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <Modal className="mb-60" title="정말 삭제하시겠습니까?">
      <div className="dialog-button-group">
        <Button variant="PRIMARY" onClick={onConfirm}>
          확인
        </Button>
        <Button variant="GHOST" onClick={onCancel}>
          취소
        </Button>
      </div>
    </Modal>
  );
};
export default AlertDialog;

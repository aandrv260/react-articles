import Button from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import ModalHeader from '../ModalHeader/ModalHeader';

interface ConfirmDeleteProps {
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmDelete = (props: ConfirmDeleteProps) => {
  const { onClose, onConfirm } = props;

  return (
    <>
      <ModalHeader heading="Do you want to delete this note?" onClose={onClose} />

      <ButtonGroup>
        <Button designStyle="full" isRed onClick={onConfirm}>
          Confrim
        </Button>

        <Button designStyle="outline" onClick={onClose}>
          Close
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ConfirmDelete;

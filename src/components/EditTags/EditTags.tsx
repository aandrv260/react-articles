import { useSelector } from 'react-redux';
import { NotesSlice } from '../../models/store';
import Button from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import styles from '../Modal/Modal.module.scss';
import ModalHeader from '../ModalHeader/ModalHeader';
import ModalInput from '../ModalInput/ModalInput';

interface EditTagsProps {
  closeHandler: () => void;
}

const EditTags = (props: EditTagsProps) => {
  const { closeHandler } = props;
  const allTags = useSelector((state: NotesSlice) => state.allTags);

  return (
    <>
      <ModalHeader heading="Edit tags" onClose={closeHandler} />

      <div className={styles['modal__inputs']}>
        {allTags.map(tag => (
          <ModalInput tag={tag} key={Math.random()} />
        ))}
      </div>

      <ButtonGroup className={styles['modal__btn-group']}>
        <Button designStyle="full" type="button" onClick={closeHandler}>
          Close
        </Button>
      </ButtonGroup>
    </>
  );
};

export default EditTags;

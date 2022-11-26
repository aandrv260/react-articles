import { memo } from 'react';
import { IonIcon } from 'react-ion-icon';

interface ModalHeaderProps {
  heading: string;
  onClose: () => void;
}

const ModalHeader = ({ heading, onClose }: ModalHeaderProps) => {
  return (
    <header>
      <h2>{heading}</h2>
      <div onClick={onClose}>
        <IonIcon name="close-outline" size="large" />
      </div>
    </header>
  );
};

export default memo<ModalHeaderProps>(ModalHeader);

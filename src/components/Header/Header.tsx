import React from 'react';
import { HeaderInfo } from '../../models/header';
import Button from '../Button/Button';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import styles from './Header.module.scss';

type HeaderProps = HeaderInfo;

const Header: React.FC<HeaderProps> = ({ heading, buttons }) => {
  return (
    <header className={styles['header']}>
      <h1>{heading}</h1>

      {buttons && buttons?.length > 0 && (
        <ButtonGroup>
          {buttons.map(button => (
            <Button onClick={button.onClick} designStyle={button.designStyle} key={Math.random()}>
              {button.text}
            </Button>
          ))}
        </ButtonGroup>
      )}
    </header>
  );
};

export default Header;

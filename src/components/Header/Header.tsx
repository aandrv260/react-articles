import React from 'react';
import { ButtonClickMouseEvent } from '../../models/form';
import Button from '../Button/Button';
import styles from './Header.module.scss';

interface HeaderProps {
  heading: string;
  button: {
    text: string;
    onClick: (event: ButtonClickMouseEvent) => void;
  };
}

const Header: React.FC<HeaderProps> = ({ heading, button }) => {
  return (
    <header className={styles['header']}>
      <h1>{heading}</h1>

      <div className={styles['header__btns']}>
        <Button onClick={button.onClick}>{button.text}</Button>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { ButtonStyles } from '../../models/header';
import styles from './Button.module.scss';

export type ButtonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

export interface ButtonProps {
  children?: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
  designStyle?: ButtonStyles;
  isRed?: boolean;
  onClick?: ButtonClickHandler;
}

const Button: React.FC<ButtonProps> = ({ type, children, onClick, designStyle, isRed }) => {
  const designClassName = styles[`btn--${designStyle || 'full'}`];
  const btnRedClassName = isRed ? styles['btn--red'] : '';

  return (
    <button
      className={`${styles['btn']} ${designClassName} ${btnRedClassName}`.trim()}
      type={type || 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

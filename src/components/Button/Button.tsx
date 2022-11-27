import React from 'react';
import { ButtonStyles } from '../../models/header';
import styles from './Button.module.scss';

export interface ButtonProps {
  children?: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
  designStyle?: ButtonStyles;
  isRed?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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

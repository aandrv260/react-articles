import React from 'react';
import { ButtonStyles } from '../../models/header';
import styles from './Button.module.scss';

interface ButtonProps {
  children?: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
  designStyle?: ButtonStyles;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ type, children, onClick, designStyle }) => {
  const designClassName = styles[`btn--${designStyle || 'full'}`];

  return (
    <button
      className={`${styles['btn']} ${designClassName}`}
      type={type || 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

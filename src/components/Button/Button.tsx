import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children?: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
  design?: 'full' | 'outline';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ type, children, design, onClick }) => {
  const designClassName = styles[`btn--${design || 'full'}`];
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

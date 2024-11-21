import React from 'react';
import styles from '../styles/Button.module.css';

type ButtonProps = {
  children: string;
  active: boolean;
  onClick?: () => void;
  width: string;  
};

const Button: React.FC<ButtonProps> = ({ children, active, onClick, width }) => {
  return (
    <button
      className={`${active ? styles.Standart : styles.Unnable}`}
      onClick={onClick}
      disabled={!active}
      style={{width: width}}
    >
      {children.toUpperCase()}
    </button>
  );
};

export default Button;

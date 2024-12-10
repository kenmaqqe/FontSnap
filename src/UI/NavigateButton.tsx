import React from 'react';
import styles from '../styles/NavigateButton.module.css';

interface NavigateButtonProps {
    children: string;
    link: string;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ children, link }) => {
    return (
        <a href={link} className={styles.Container}>
            <h2 className={styles.Text}>{children}</h2>
        </a>
    );
};

export default NavigateButton;

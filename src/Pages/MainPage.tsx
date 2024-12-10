import React from 'react';
import Logo from '../assets/LOGO smal.svg';
import styles from '../styles/MainPage.module.css';
import { NavigateButton } from '../UI/main';

const MainPage = () => {
    return (
        <section className={styles.MainPage}>
            <div className={styles.Header}>
                <h1>Welcome to</h1>
                <img src={Logo} alt="logo-image" />
            </div>
            <div className={styles.Text}>
                <h2>Choise what you want to do</h2>
                <p>
                    Our application lets you unlock the power of images by
                    identifying text from photos with precision. Whether you
                    need to extract text or detect the font style used in an
                    image, our tool provides quick and accurate results. Ideal
                    for designers, students, and professionals alike, this app
                    makes text recognition and font identification effortless
                    and accessible. Simply upload an image and let the app do
                    the rest!
                </p>
            </div>
            <div className={styles.Buttons}>
                <NavigateButton link="/Text-Identificator">
                    Text identify
                </NavigateButton>
                <NavigateButton link="/Font-Identificator">
                    Font identify
                </NavigateButton>
            </div>
        </section>
    );
};

export default MainPage;

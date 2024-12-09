import React from 'react'
import Logo from '../assets/LOGO smal.svg'
import styles from '../styles/Header.module.css'

const Header = () => {
  return (
    <header className={styles.Header}>
      <div className={styles.Container}>
      <div className={styles.Logo}>
        <a href="/"><img src={Logo} alt="Logo-images" /></a>
      </div>
      <div className={styles.Menu}>
        <ul className={styles.List}>
          <li className={styles.ListItem}><a className={styles.Link} href="/Text-Identificator">Text identify</a></li>
          <li className={styles.ListItem}><a className={styles.Link} href="/Font-Identificator">Font identify</a></li>
        </ul>
      </div>
      </div>
    </header>
  )
}

export default Header
import LogoLink from '../assets/fontsnap-logo-final.svg'
import UnderLine from '../assets/UnderLine.svg'
import Square from '../assets/Square.svg'
import Cross from '../assets/Cross.svg'
import styles from '../styles/Header.module.css'

const Header = () => {
  return (
    <header className={styles.Header}>
        <div className={styles.Logo}>
            <img src={LogoLink} alt="logo-image" style={{width: '120px',height: '40px',cursor: 'pointer'}}/>
        </div>
        <div className={styles.Buttons}>
            <button><img src={UnderLine} alt="minus" /></button>
            <button><img src={Square} alt="square" /></button>
            <button><img src={Cross} alt="cross" /></button>
        </div>
    </header>
  )
}

export default Header
import Button from './../UI/Button';
import styles from '../styles/Modal.module.css'
import Logo from '../assets/fontsnap-logo-final.svg'
import Error from '../assets/Error.svg'
import { useState } from 'react';

type ModalProps = {
    description: string;
    helloModal: boolean;
}

const Modal: React.FC<ModalProps> = ({ description, helloModal }) => {
    const [visible, setVisible] = useState<boolean>(true);

    const onClose = () => {
        setVisible(false);
    }
  return (
    <div className={styles.Modal} style={visible? {display: "block"} : {display: 'none'}}>
        <div className={styles.Background}></div>
        <div className={styles.Container}>
            <span>{helloModal?<h2>Welcome to</h2>:(null)}{helloModal ? <img src={Logo} alt='logo-image'/>: <img src={Error} alt='error-image'/>}</span>
            <p>{description}</p>
            <Button children='Okay' active={true} onClick={onClose} width='100%' />
        </div>
    </div>
  )
}

export default Modal
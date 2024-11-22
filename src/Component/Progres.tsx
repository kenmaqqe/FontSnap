import styles from '../styles/Progres.module.css'
import { useEffect, useState } from 'react';

type ProgresProps = {
    stepNumbers: number;
}
const Progres: React.FC<ProgresProps> = ({stepNumbers}) => {
    const [step, setStep] = useState<number>(stepNumbers);
    useEffect(()=>{
        setStep(stepNumbers);
    },[stepNumbers])
  return (
    <div className={styles.Container}>
        <div className={`${styles.Step} ${styles.Active}`}>
            <div>Step 1</div>
            <p>Upload an image</p>
        </div>
        <div className={styles.DotsBlock}>
            {['','','','','','','','','',].map((a,key)=>{
                return (
                    <span key={key} className={step>=2?styles.ActiveDots:styles.Dots}>{a}</span>
                )
            })}
        </div>
        <div className={step>=2?`${styles.Step} ${styles.Active}`:styles.Step}>
            <div>Step 2</div>
            <p>Select text</p>
        </div>
        <div className={styles.DotsBlock}>
            {['','','','','','','','','',].map((a,key)=>{
                return (
                    <span key={key} className={step===3?styles.ActiveDots:styles.Dots}>{a}</span>
                )
            })}
        </div>
        <div className={step===3?`${styles.Step} ${styles.Active}`:styles.Step}>
            <div>Step 3</div>
            <p>Result</p>
        </div>
    </div>
  )
}

export default Progres
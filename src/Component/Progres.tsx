import styles from '../styles/Progres.module.css'

const Progres = () => {
  return (
    <div className={styles.Container}>
        <div className={styles.Step}>
            <div>Step 1</div>
            <p>Upload an image</p>
        </div>
        <div className={styles.DotsBlock}>
            {['','','','','','','','','',].map((a,key)=>{
                return (
                    <span key={key} className={styles.Dots}>{a}</span>
                )
            })}
        </div>
        <div className={styles.Step}>
            <div>Step 2</div>
            <p>Select text</p>
        </div>
        <div className={styles.DotsBlock}>
            {['','','','','','','','','',].map((a,key)=>{
                return (
                    <span key={key} className={styles.Dots}>{a}</span>
                )
            })}
        </div>
        <div className={styles.Step}>
            <div>Step 3</div>
            <p>Result</p>
        </div>
    </div>
  )
}

export default Progres
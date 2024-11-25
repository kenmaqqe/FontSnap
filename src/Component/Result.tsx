import { useSelector, UseSelector } from "react-redux"
import styles from "../styles/Result.module.css"

const Result = () => {
  const text = useSelector((state: any) => state.data.textForSearch);
  console.log(text)
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        {text}
      </div>
    </div>
  )
}

export default Result
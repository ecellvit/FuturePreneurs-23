import styles from "styles/ticker.module.css"
const Ticker = () => {
  return (
    <div className={`${styles["ticker-tape"]}`}>
      <div className={styles.ticker}>
        <div className={`${styles["ticker__item"]}`}>{"FUTUREPRENEUR - WE BREED BUSINESS - "} </div>
        <div className={`${styles["ticker__item"]}`}>{"FUTUREPRENEUR - WE BREED BUSINESS - "} </div>
        <div className={`${styles["ticker__item"]}`}>{"FUTUREPRENEUR - WE BREED BUSINESS - "} </div>
        <div className={`${styles["ticker__item"]}`}>{"FUTUREPRENEUR - WE BREED BUSINESS - "} </div>
      </div>
    </div>
  )
}

export default Ticker

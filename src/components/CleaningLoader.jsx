import styles from './CleaningLoader.module.css'

function CleaningLoader({ isExiting }) {
  return (
    <div
      className={`${styles.overlay} ${isExiting ? styles.overlayExiting : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Preparing your fresh space"
    >
      <div className={styles.loader}>
        <div className={styles.bubbleField} aria-hidden="true">
          <span className={`${styles.bubble} ${styles.bubbleOne}`} />
          <span className={`${styles.bubble} ${styles.bubbleTwo}`} />
          <span className={`${styles.bubble} ${styles.bubbleThree}`} />
          <span className={`${styles.bubble} ${styles.bubbleFour}`} />
          <span className={`${styles.bubble} ${styles.bubbleFive}`} />
        </div>

        <div className={styles.droplet} aria-hidden="true">
          <span className={styles.sparkle}>✦</span>
        </div>

        <p className={styles.message}>Preparing your fresh space<span className={styles.ellipsis}>...</span></p>
      </div>
    </div>
  )
}

export default CleaningLoader

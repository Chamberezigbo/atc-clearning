import styles from './CleanSwipeLoader.module.css'

function CleanSwipeLoader({ isExiting }) {
  return (
    <div
      className={`${styles.overlay} ${isExiting ? styles.overlayExiting : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Making things shine"
    >
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.dust}>
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className={styles.cleanTrail}>
          <span className={`${styles.sparkle} ${styles.sparkleOne}`}>✦</span>
          <span className={`${styles.sparkle} ${styles.sparkleTwo}`}>✦</span>
          <span className={`${styles.sparkle} ${styles.sparkleThree}`}>✦</span>
        </div>
        <div className={styles.cloth}>
          <span className={styles.clothFold} />
        </div>
      </div>
      <p className={styles.message}>Making things shine<span className={styles.ellipsis}>...</span></p>
    </div>
  )
}

export default CleanSwipeLoader

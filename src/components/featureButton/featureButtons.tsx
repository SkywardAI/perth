import styles from './featureButtons.module.css'
import Link from 'next/link'

export default function FeatureButtons() {
  return (
    <div className={styles.featureButtons}>
      <Link href="/saas" className={styles.button}>
        Local Intelligent
      </Link>
      <Link href="/cloud" className={styles.button}>
        Reliable Cloud Services
      </Link>
      <Link href="/research" className={styles.button}>
        Research & Innovation
      </Link>
      <Link href="/opensource" className={styles.button}>
        Open Source Ecosystem
      </Link>
    </div>
  )
}

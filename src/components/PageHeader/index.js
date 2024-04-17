import styles from './Styles.module.scss'

const PageHeader = () => {
  return (
    <header>
      <div className={styles.container}>
        <div className={styles.items}>
          <img src={'/assets/github.svg'} className={styles.iconGithub}/>
          <p className={styles.divider}>/</p>
          <p className={styles.profile}>Profile</p>
        </div>
      </div>
    </header>
  )
}

export default PageHeader
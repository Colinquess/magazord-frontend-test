import styles from './Styles.module.scss'

export default function ProfilePicture({avatar_url}) {
  return (
    <main>
      <div className={styles.container}>
        <img
          className={styles.avatar}
          src={avatar_url}
        />
        <div className={styles.contentIcon}>
          <img
            className={styles.iconProfileAvatar}
            src='/assets/profile-avatar.svg'
          />
        </div>
      </div>
    </main>
  )
}
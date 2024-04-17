import { useEffect, useState } from "react"
import styles from './Styles.module.scss'
import ProfilePicture from './ProfilePicture'
import UserInfo from './UserInfo'

const UserProfile = ({user}) => {

  const [showInfo, setShowInfo] = useState(0)

  const [windowSize, setWindowSize] = useState(window.innerWidth)

  useEffect(() => {
    setShowInfo(windowSize > 672)
  }, [windowSize])

  const handleClickInfo = () => setShowInfo(state => !state)

  return (
    <div className={styles.container}>

      <ProfilePicture avatar_url={user.avatar_url} />

      <span className={styles.name}>
        {user.name}
      </span>

      <div className={styles.containerDescription}>
        <span className={styles.description}>
          {user.bio}
        </span>
      </div>

      {(user.company || user.location || user.blog || user.twitter_username) ? 
        <div className={styles.containerInfo} onClick={handleClickInfo}>
          <span className={styles.info}>
            Informações Adicionais
          </span>
          <img className={showInfo ? styles.toAbove : styles.toBelow} src={'/assets/icon-arrow-up.svg'}/>
        </div>
      : null}

      {showInfo ?
        <div className={styles.contentInfo}>
          {user.company ?
            <UserInfo src={'/assets/icon-company.svg'} description={user.company} link={`https://duckduckgo.com/?q=%5C${encodeURIComponent(user.company)}`}/> : null}
          {user.location ?
            <UserInfo src={'/assets/icon-location.svg'} description={user.location} link={`https://www.google.com/maps/place/${user.location}`}/> : null}
          {user.blog ?
            <UserInfo src={'/assets/icon-link.svg'} description={user.blog} link={`https://${user.blog}`}/> : null}
          {user.twitter_username ?
            <UserInfo src={'/assets/icon-social.svg'} description={user.twitter_username} link={`https://twitter.com/${user.twitter_username}`}/> : null}
        </div>
      : null}
    </div>
  )
}

export default UserProfile
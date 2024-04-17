import { useEffect, useState } from "react"
import styles from './Styles.module.scss'
import ProfilePicture from './ProfilePicture'
import UserInfo from './UserInfo'

const UserProfile = ({user}) => {

  const [showInfo, setShowInfo] = useState(0)

  const [winSize, setWinSize] = useState(window.innerWidth)

  useEffect(() => setShowInfo(winSize > 641), [winSize])

  useEffect(() => {
    const onResize = () => setWinSize(window.innerWidth)

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

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
          <img className={showInfo ? styles.toAbove : styles.toBelow} src={'/assets/arrow-up.svg'}/>
        </div>
      : null}

      {showInfo ?
        <div className={styles.contentInfo}>
          {user.company ?
            <UserInfo src={'/assets/company.svg'} description={user.company} link={`https://duckduckgo.com/?q=%5C${encodeURIComponent(user.company)}`}/> : null}
          {user.location ?
            <UserInfo src={'/assets/location.svg'} description={user.location} link={`https://www.google.com/maps/place/${user.location}`}/> : null}
          {user.blog ?
            <UserInfo src={'/assets/link.svg'} description={user.blog} link={`https://${user.blog}`}/> : null}
          {user.twitter_username ?
            <UserInfo src={'/assets/social.svg'} description={user.twitter_username} link={`https://twitter.com/${user.twitter_username}`}/> : null}
        </div>
      : null}
    </div>
  )
}

export default UserProfile
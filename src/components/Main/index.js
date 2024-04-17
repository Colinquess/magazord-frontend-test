import React from 'react';
import PageContent from '../PageContent'
import UserProfile from '../UserProfile'
import styles from './Styles.module.scss'
import { useEffect, useState } from 'react'
import User from '../../hooks/User'
import Config from '../../Config.js'

const Main = () => {

  const [UserData, setUserData] = useState(null)

  useEffect(() => {
    const getUser = async () => {

      const UserData = localStorage.getItem('UserData')

      const ParsedUserData = JSON.parse(UserData);

      if( UserData && ParsedUserData.user.login === Config.Git_User)
        setUserData(ParsedUserData)
      else
      {
        const DataObj = {
          user: await User.getUser(),
          repos: await User.getRepos(),
          starreds: await User.getStarred()
        }
  
        setUserData(DataObj)

        localStorage.setItem('UserData', JSON.stringify(DataObj))
      }
    }

    return () => {
      getUser()
    }
  }, [])

  return (
    <div>
      {
        UserData? 
          <main>
            <div className={styles.container}>
              <UserProfile user={UserData.user}/>
              <PageContent repos={UserData.repos} starreds={UserData.starreds}/>
            </div>
          </main>
        : null
      }
    </div>
  )
}

export default Main
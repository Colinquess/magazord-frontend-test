import { useState } from "react"
import styles from './Styles.module.scss'
import NavigatorItem from "./NavigatorItem"

export default function ContentNavigator({ starreds, repos, menu, setMenu }) {
  return (
    <nav className={styles.container}>
      <NavigatorItem
        image="/assets/icon-repositories.svg"
        name="Repositories"
        counter={repos.length}
        selected={menu === 'UserRepositories'}
        value="UserRepositories"
        handleClick={setMenu}
      />

      <NavigatorItem
        image="/assets/icon-starred.svg"
        name="Starred"
        counter={starreds.length}
        selected={menu === 'UserStarreds'}
        value="UserStarreds"
        handleClick={setMenu}
      />
    </nav>
  )
}
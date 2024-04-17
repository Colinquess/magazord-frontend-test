import { useEffect, useState } from 'react'
import styles from './Styles.module.scss'
import ContentNavigator from './ContentNavigator'
import UserRepositories from './RepoAndStarred/UserRepositories'
import UserStarreds from './RepoAndStarred/UserStarreds'
import ItemSearch from './ItemSearch'

const PageContent = ({repos, starreds}) => {

  const [menu, setMenu] = useState('UserRepositories')

  const [search, setSearch] = useState('')

  const [languages, setLanguages] = useState()

  const [types, setTypes] = useState()



  useEffect(() => {
    return () => {

      // Merging languages from both repos and starreds.
      let arr = [...repos.map(repo => repo.language), ...starreds.map(starred => starred.language)]
      const languages = [...new Set(arr)] // Set should remove the duplicates

      let newLanguages = [];
      newLanguages.push({id: 'all', name:'All', check: true})

      languages.filter(Boolean).forEach(desc => newLanguages.push(
            {id: desc.toLowerCase(),  name: desc,       check: false }))

      setLanguages(newLanguages);

      setTypes([
        {id: 'all',               name:'All',       check: true},
        {id: 'sources',           name:'Sources',   check: false},
        {id: 'fork',              name:'Fork',      check: false},
        {id: 'archived',          name:'Archived',  check: false},
        {id: 'mirrors',           name:'Mirrors',   check: false}
      ])

    }
  }, [])

  return (
    <div className={styles.container}>

      {repos && starreds && languages && types ? 
        <>
          <ContentNavigator repos={repos} starreds={starreds} menu={menu} setMenu={setMenu} />

          <ItemSearch 
            searchHandles={[search, setSearch]}
            languagesHandles={[languages, setLanguages]}
            typesHandles={[types, setTypes]}/>

          {menu === 'UserRepositories' ? <UserRepositories repos={repos} types={types} languages={languages} search={search}/> : null}
          {menu === 'UserStarreds' ? <UserStarreds starreds={starreds} types={types} languages={languages} search={search}/> : null}
        </>
      : null}

    </div>
  )
}

export default PageContent
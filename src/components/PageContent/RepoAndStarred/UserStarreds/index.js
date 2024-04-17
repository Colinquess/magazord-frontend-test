import styles from '../Styles.module.scss'

export default function UserStarreds({ starreds, types, languages, search }) {

  const shouldHideSection = (starred) =>
  {
    if(
      types[0].check || // All types checked
      languages[0].check || // All languages checked
      search && starred.full_name.toLowerCase().search(search.toLowerCase()) > -1 || // Filter Input found
      languages.find( language => language.check && language.name === starred.language) ||  // Language of starred checked
      types.find( type => type.check && starred[type.id] === true) // Type of starred checked
    )
      return false

    return true
  }

  return (
    <article>
      {starreds.map(starred => {
          const [name, starredName] = starred.full_name.split('/')

          return (
            <section key={starred.id} className={shouldHideSection(starred) ? styles.hiddenSection : null}>
              <div className={styles.container}>
                <a href={starred.html_url} className={styles.link} target="_blank">
                  <span className={styles.title}>
                    {name} 
                    <span className={styles.separator}>/</span>
                    <span className={styles.name}>
                      {starredName}
                    </span>
                  </span>
                </a>
                <p className={styles.description}>
                  {starred.description}
                </p>
                <div className={styles.footer}>
                  <div className={styles.fork}>
                    {starred.language}
                  </div>
                  <div className={styles.fork}>
                    <img src={'/assets/icon-fork.svg'}/>
                    <span>
                      {starred.forks_count}
                    </span>
                  </div>
                </div>
              </div>

              <hr />

            </section>
          )
        })}
    </article>
  )
}
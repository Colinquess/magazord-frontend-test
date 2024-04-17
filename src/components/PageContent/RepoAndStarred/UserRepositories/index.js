import styles from '../Styles.module.scss'

export default function UserRepositories({ repos, types, languages, search }) {

  const shouldHideSection = (repo) =>
  {
    if(
      types[0].check || // All types checked
      languages[0].check || // All languages checked
      search && repo.full_name.toLowerCase().search(search.toLowerCase()) > -1 || // Filter Input found
      languages.find( language => language.check && language.name === repo.language) || // Language of repo checked
      types.find( type => type.check && repo[type.id] === true) // Type of repo checked
    )
      return false

    return true
  }

  return (
    <article>
      {repos.map(repo => {
          const [name, repoName] = repo.full_name.split('/')

          return (
            <section key={repo.id} className={shouldHideSection(repo) ? styles.hiddenSection : null}>
              <div className={styles.container}>
                <a href={repo.clone_url} className={styles.link} target="_blank">
                  <span className={styles.title}>
                    {name}
                    <span className={styles.separator}>/</span>
                    <span className={styles.name}>
                      {repoName}
                    </span>
                  </span>
                </a>
                <p className={styles.description}>
                  {repo.description}
                </p>
                <div className={styles.footer}>
                  <div className={styles.fork}>
                    <img src={'/assets/repo-starred.svg'}/>
                    <span>
                      {repo.stargazers_count}
                    </span>
                  </div>
                  <div className={styles.fork}>
                    <img src={'/assets/fork.svg'}/>
                    <span>
                      {repo.forks_count}
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
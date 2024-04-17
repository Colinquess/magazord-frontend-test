import Config from '../Config.js'

const User = {

  getUser: async () => {

    let gitUser = {
      login: null,
      avatar_url: null,
      name: null,
      bio: null,
      company: null,
      location: null,
      blog: null,
      twitter_username: null,
    }

    try
    {
      const response = await fetch(Config.userEndpoints.userData)
      const person = await response.json()

      gitUser.login = person.login
      gitUser.avatar_url = person.avatar_url
      gitUser.name = person.name || person.login
      gitUser.bio = person.bio
      gitUser.company = person.company
      gitUser.location = person.location
      gitUser.blog = person.blog
      gitUser.twitter_username = person.twitter_username
    }
    catch(error)
    {
      const errorCast = new Error(error)
      console.log('Error found whilist trying to get user: ', errorCast.name, errorCast.message, errorCast.cause)
    }

    return gitUser
  },

  getRepos: async () => {

    let gitRepos= []

    try{
      const response = await fetch(Config.userEndpoints.userRepos)
      const repos = await response.json()

      gitRepos = repos.map(repo => {
        return {
          id: repo.id,
          full_name: repo.full_name,
          description: repo.description ,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          clone_url: repo.clone_url,
          language: repo.language,
          fork: repo.fork,
          archived: repo.archived,
          mirrors: repo.mirror_url
        }
      })
    }
    catch(error)
    {
      const errorCast = new Error(error)
      console.log('Error found whilist trying to get repos: ', errorCast.name, errorCast.message, errorCast.cause)
    }

    return gitRepos
  },

  getStarred: async () => {

    let gitStarred = []

    try{
      const response = await fetch(Config.userEndpoints.userStarred)
      const starreds = await response.json()

      gitStarred = starreds.map(starred => {
        return {
          id: starred.id,
          full_name: starred.full_name,
          description: starred.description,
          language: starred.language,
          forks_count: starred.forks_count,
          html_url: starred.owner.html_url,
          fork: starred.fork,
          archived: starred.archived,
          mirrors: starred.mirror_url,
        }
      })  
    }
    catch(error)
    {
      const errorCast = new Error(error)
      console.log('Error found whilist trying to get starred: ', errorCast.name, errorCast.message, errorCast.cause)
    }

    return gitStarred
  }
}

export default User
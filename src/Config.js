const Config = {
    Git_User: "rzashakeri", // Change here, "rzashakeri" is a great test user
    Protocol: 'https',
    BaseAPI_URL: 'api.github.com',
    userEndpoints: {
        get userData(){ // https://api.github.com/users/colinquess
            return `${Config.Protocol}://${Config.BaseAPI_URL}/users/${Config.Git_User}`;
        },

        get userRepos(){ // https://api.github.com/users/colinquess/repos
            return `${Config.Protocol}://${Config.BaseAPI_URL}/users/${Config.Git_User}/repos`;
        },

        get userStarred(){ // https://api.github.com/users/colinquess/starred
            return `${Config.Protocol}://${Config.BaseAPI_URL}/users/${Config.Git_User}/starred`;
        }
    }
}

export default Config
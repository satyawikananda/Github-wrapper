/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

 const axios = require('axios');

 const searchRepo = (repo) => {
    return new Promise( async (resolve, reject) => {
        await axios.get(`https://api.github.com/search/repositories?q=${repo}`)
            .then(response => {
                if(response.status == 200){
                    const results = response.data.items
                    
                    data = {}
                    data.code = response.status
                    data.message = "ok"
                    data.totalCount = response.data.total_count
                    data.items = []
                    data.creator = "Satya Wikananda"

                    if(data.totalCount != 0){
                        results.forEach((res) => {
                            data.items.push({
                                id: res.id,
                                nodeId: res.node_id,
                                nameRepo: res.name,
                                fullNameRepo: res.full_name,
                                url_repo: res.html_url,
                                description: res.description,
                                git_url: res.git_url,
                                ssh_url: res.ssh_url,
                                clone_url: res.clone_url,
                                svn_url: res.svn_url,
                                homepage: res.homepage,
                                stargazers: res.stargazers_count,
                                watchers: res.watchers,
                                forks: res.forks,
                                defaultBranch: res.default_branch,
                                language: res.language,
                                isPrivate: res.private,
                                isFork: res.fork,
                                createdAt: res.created_at,
                                updatedAt: res.updated_at,
                                pushedAt: res.pushed_at,
                                author: {
                                    username: res.owner.login,
                                    id_user: res.owner.id,
                                    avatar_url: res.owner.avatar_url,
                                    user_github_url: res.owner.html_url,
                                    type: res.owner.type,
                                    isSiteAdmin: res.owner.site_admin
                                }
                            })
                        })
                    }else{
                        data.items = "Repositories not found"
                    }

                    resolve(data)
                }else{
                    reject({
                        code: 500,
                        success: false,
                        message: "Something went wrong"
                    })
                }
            })
            .catch(err => {
                reject(err)
            })
    })
 }

 module.exports = searchRepo
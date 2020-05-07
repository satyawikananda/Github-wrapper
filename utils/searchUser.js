/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

const axios = require('axios');

const searchRepo = (user) => {
   return new Promise( async (resolve, reject) => {
       await axios.get(`https://api.github.com/users/${user}`)
           .then(response => {
               if(response.status == 200){
                   const results = response.data

                   data = {}
                   data.code = response.status
                   data.message = "ok"
                   data.user = {
                       idUser: results.id,
                       username: results.login,
                       nodeId: results.node_id,
                       avatarUrl: results.avatar_url,
                       gravatarId: results.gravatar_id == '' ? null : results.gravatar_id,
                       githubUrl: results.html_url,
                       type: results.type,
                       isSiteAdmin: results.site_admin,
                       name: results.name,
                       company: results.company,
                       blog: results.blog,
                       email: results.email,
                       hireable: results.hireable,
                       bio: results.bio,
                       publicRepos: results.public_repos,
                       publicGists: results.public_gists,
                       followers: results.followers,
                       following: results.following,
                       createdAt: results.created_at,
                       updatedAt: results.updated_at
                   }

                   data.creator = "Satya wikananda"
                   console.log(results)
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
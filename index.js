/**
 * @author Satya Wikananda <satyawikananda456@gmail.com>
 * @license MIT
 */

 const GithubWrapper = require('./utils')

 GithubWrapper.searchRepo('anitrendz+scraper')
    .then(data => console.log(data))
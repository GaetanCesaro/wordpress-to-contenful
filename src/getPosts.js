const utils = require('./utils');
const https = require('https');

module.exports = {
    exportBlogposts: function(apiUrl) {
        return new Promise(resolve => {
            const exportPageOfPosts = (apiUrl, page = 1, allPosts = []) => {
                utils.log(`Getting posts for page ${page}`)
                const url = `${apiUrl}?page=${page}`
                https.get(url, (res) => {
                    // When we get a 404 back we went one page over those with posts.
                    // So we are done now.
                    if (res.statusCode === 400) {
                        return resolve(allPosts)
                    }
                    let result = ''

                    res.on('data', (d) => {
                        result += d.toString()
                    })

                    res.on('end', async () => {
                        blogPosts = JSON.parse(result)
                        return exportPageOfPosts(apiUrl, page + 1, allPosts.concat(blogPosts))
                    })

                }).on('error', (e) => {
                    throw (Error('Error while exporting blogposts', e))
                })
            }
            exportPageOfPosts(apiUrl)
        })
    }
}
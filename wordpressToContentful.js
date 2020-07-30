//const execa = require('execa');
const Listr = require('listr');

const getPosts = require('./src/getPosts');
const transformPosts = require('./src/transformPosts');
const utils = require('./src/utils');

const wpHost = 'https://cametgaetauboutdumonde.fr'
const postsUrl = `${wpHost}/wp-json/wp/v2/posts`

let allPosts = [];

const tasks = new Listr(
    [
        {
            title: 'Read local JSON',
            task: () => allPosts = utils.readJson('posts.json')
        },
        {
            title: 'Get Posts',
            skip: () => {
                if (allPosts != undefined && allPosts.length > 0) {
                    return 'Posts have already been loaded from file';
                }
            },
            task: () => getPosts.exportBlogposts(postsUrl, utils.log)
                        .then(result => {
                            allPosts = result;
                        })
                        .catch(msg => { throw new Error(msg); })
        },
        {
            title: 'Save Posts to JSON',
            task: () => utils.writeJson('posts.json', allPosts)
        },
        {
            title: 'Transform Posts',
            task: () => transformPosts.transformPosts(allPosts)
        },
        {
            title: 'Save Transformed Posts to JSON',
            task: () => utils.writeJson('transformedPosts.json', allPosts)
        },
        /*{
            title: 'Log allPosts',
            task: () => utils.log(allPosts)
        },*/
    ]//, {concurrent: true}
);
 
tasks.run().catch(err => {
    console.error(err);
});
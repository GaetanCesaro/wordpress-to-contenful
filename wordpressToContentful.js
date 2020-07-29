//const execa = require('execa');
const Listr = require('listr');
const getPosts = require('./getPosts');

const postsUrl = 'https://cametgaetauboutdumonde.fr/wp-json/wp/v2/posts?page=1&per_page=5&_embed=1'

const tasks = new Listr([
    {
        title: 'Get Posts',
        task: () => {
            return new Listr([
                {
                    title: 'Echo',
                    task: () => getPosts.exportBlogposts(postsUrl).catch(msg => {
                        throw new Error(msg);
                    })
                },
            ], {concurrent: true});
        }
    },
    /*
    {
        title: 'Install package dependencies with Yarn',
        task: (ctx, task) => execa('yarn')
            .catch(() => {
                ctx.yarn = false;
 
                task.skip('Yarn not available, install it via `npm install -g yarn`');
            })
    },
    {
        title: 'Install package dependencies with npm',
        enabled: ctx => ctx.yarn === false,
        task: () => execa('npm', ['install'])
    },
    {
        title: 'Run tests',
        task: () => execa('npm', ['test'])
    },
    {
        title: 'Publish package',
        task: () => execa('npm', ['publish'])
    }
    */
]);
 
tasks.run().catch(err => {
    console.error(err);
});
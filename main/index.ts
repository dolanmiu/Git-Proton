
import * as Git from 'nodegit';
Git.Repository.open('test').then((repo) => {
    // TODO
    console.log(repo);
});

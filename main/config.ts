import * as nconf from 'nconf';
import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

export class Config {

    public writeConfig(directory: string) {
        mkdirp(`${__dirname}/configuration`, err => {
            if (err) {
                return console.error(err);
            }

            fs.writeFile(`${__dirname}/configuration/projects.json`, '{}', error => {
                if (err) {
                    return console.log(err);
                }
                this.readConfig('fff');
            });

        });


    }

    private readConfig(directory: string) {
        nconf.argv().env();
        nconf.file('projects', { file: `${__dirname}/configuration/projects.json` });

        nconf.set(path.basename(directory), {
            directory,
        });

        nconf.save('projects', err => {
            fs.readFile(`${__dirname}/configuration/projects.json`, (error, data) => {
                if (error) {
                    return console.log(error);
                }
                console.dir(JSON.parse(data.toString()));
            });
        });
    }
}

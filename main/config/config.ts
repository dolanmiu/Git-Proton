import * as nconf from 'nconf';
import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

export class Config {

    constructor() {
        this.ensureFileExists('repos.json', () => {
            nconf.add('repos', { type: 'file', file: `${__dirname}/configuration/repos.json` });
        });
    }

    public writeConfig(directory: string) {
        this.addProject(directory);
    }

    public load() {
        let repos = nconf.get('repos');
        if (!repos) {
            return [];
        }

        let array = new Array<Repo>();

        for (let key in repos) {
            if (repos.hasOwnProperty(key)) {
                array.push({
                    name: repos[key].name,
                    directory: repos[key].directory,
                });
            }
        }

        return array;
    }

    private ensureFileExists(fileName: string, callback: () => void = () => { }) {
        mkdirp(`${__dirname}/configuration`, err => {
            if (err) {
                return console.error(err);
            }

            fs.access(`${__dirname}/configuration/${fileName}`, err => {
                if (!err) {
                    return callback();
                }

                fs.writeFile(`${__dirname}/configuration/${fileName}`, '{}', err => {
                    if (err) {
                        return console.log(err);
                    }

                    callback();
                });
            });
        });
    }

    private addProject(directory: string) {
        nconf.set(`repos:${path.basename(directory)}`, {
            name: path.basename(directory),
            directory: directory,
        });

        nconf.save('repos', err => {
            fs.readFile(`${__dirname}/configuration/repos.json`, (error, data) => {
                if (error) {
                    return console.log(error);
                }
                console.dir(JSON.parse(data.toString()));
            });
        });
    }
}

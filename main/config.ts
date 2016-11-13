import * as nconf from 'nconf';
import * as path from 'path';
import * as fs from 'fs';
import * as mkdirp from 'mkdirp';

export class Config {

    public writeConfig(directory: string) {
        this.ensureFileExists('projects.json', () => {
            this.addProject(directory);
        });
    }

    private ensureFileExists(fileName: string, callback: () => void) {
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

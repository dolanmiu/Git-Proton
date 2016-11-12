import * as nconf from 'nconf';
import * as path from 'path';
import * as fs from 'fs';

export class Config {

    public writeConfig(directory: string) {
        nconf.argv().env();
        nconf.file('projects', { file: 'configuration/projects.json' });

        nconf.set(path.basename(directory), {
            directory,
        });

        nconf.save('projects', err => {
            fs.readFile('configuration/projects.json', (error, data) => {
                console.dir(JSON.parse(data.toString()));
            });
        });
    }
}

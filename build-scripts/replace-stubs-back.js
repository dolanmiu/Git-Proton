const fs = require('fs-extra')
var glob = require('glob');
var path = require('path');

glob("src/**/*.ts.stub", (er, files) => {
    for (const file of files) {
        const stubFilename = path.basename(file);
        const originalFilename = stubFilename.replace('.stub', '');

        const originalFilePath = path.join(path.dirname(file), originalFilename);

        fs.copySync(file, originalFilePath);
        fs.unlinkSync(file);
    }
});

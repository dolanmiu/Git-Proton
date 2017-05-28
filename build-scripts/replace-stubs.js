const fs = require('fs-extra')
var glob = require('glob');
var path = require('path');

glob("src/**/_*.ts", (er, files) => {
    for (const file of files) {
        const electronFilename = path.basename(file);
        const originalFilename = electronFilename.replace('_', '');

        const originalFilePath = path.join(path.dirname(file), originalFilename);
        const newOriginalFilePath = path.join(path.dirname(file), `${originalFilename}.mock`);

        fs.copySync(originalFilePath, newOriginalFilePath)
        fs.copySync(file, originalFilePath);
    }
});

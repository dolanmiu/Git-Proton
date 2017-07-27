const fs = require('fs-extra')
var glob = require('glob');
var path = require('path');

glob("src/**/_*.ts", (er, files) => {
    for (const file of files) {
        const electronFilename = path.basename(file);
        const originalFilename = electronFilename.replace('_', '');

        const originalFilePath = path.join(path.dirname(file), originalFilename);
        const newOriginalFilePath = path.join(path.dirname(file), `${originalFilename}.stub`);

        var file1 = fs.readFileSync(file, "utf8");
        var file2 = fs.readFileSync(originalFilePath, "utf8");

        const res = file1.length - file2.length;

        if (res > 0) {
            console.log(`Copying file: ${file}`);
            fs.copySync(originalFilePath, newOriginalFilePath);
            fs.copySync(file, originalFilePath);
        } else {
            console.log('Files are the same skipping');
        }
    }
});

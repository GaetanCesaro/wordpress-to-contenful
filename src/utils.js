const fs = require('fs');

module.exports = {
    log: function(text) {
        console.log(text);
    },

    writeJson: function(filename, jsonData) {
        const data = JSON.stringify(jsonData, null, 4);

        fs.writeFile(`json/${filename}`, data, (err) => {
            if (err) {
                throw err;
            }
        });
    },

    readJson: function(filename) {
        try {
            let rawdata = fs.readFileSync(`json/${filename}`);
            return JSON.parse(rawdata, null, 4);
        } catch(err) {
            if (err.code === 'ENOENT') {
                //console.log('File not found!');
            } else {
                throw err;
            }
        }
    }
}

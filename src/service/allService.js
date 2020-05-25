const fs = require('fs');

const readFile = async (filepath) => {
    let dataObj;
    return new Promise(function (resolve, reject) {
        fs.readFile(filepath, function (err, data) {
            if (err) {
                reject(err);
            }
            data = data.toString() || "";
            dataObj = JSON.parse(data);
            resolve(dataObj);
        });
    })    
}

const writeFile = async (filepath, dataObj) => {
    let str = JSON.stringify(dataObj);
    fs.writeFile(filepath, str, function (err) {
        if (err) {
            console.log(err);
        }
        return true;
    })
}

module.exports = {
    readFile,
    writeFile
}
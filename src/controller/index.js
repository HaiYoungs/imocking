const fs = require('fs');

//获取数据
const getData = (fpath) => {
    let dataObj;
    return new Promise(function (resolve, reject) {
        fs.readFile(fpath, function (err, data) {
            if (err) {
                reject(err);
            }
            dataObj = JSON.parse(data.toString());
            resolve(dataObj);
        });
    })    
}

module.exports = {
    getData
}
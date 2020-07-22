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

// 修改文件后缀名
const changeFile = async (filepath) => {
    // console.log(filepath);
    fs.stat(filepath, function(eror, stats) {
        if (eror) {
            console.log('失败');
        }
        if (stats.isFile()) {
            if (filepath.indexOf('.json') != -1) {
                rename(filepath,filepath.replace('.json','.side',function(){
                }))
            }
        }
    })
}
function rename (oldPath, newPath) {
    fs.rename(oldPath, newPath, function(err) {
        if (err) {
            throw err;
        }
    });
}

module.exports = {
    readFile,
    writeFile,
    changeFile
}
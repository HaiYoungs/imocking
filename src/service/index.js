const { readFile, writeFile, changeFile } = require('./allService');

const getService = async (filepath, id) => {
    let dataObj;
    await readFile(filepath).then((data) =>  {// 读取文件
        dataObj = data;
    }).catch((err) => {
        console.log(err);
    });
    //判断有没有传 id
    if (id == '') {
        // console.log(dataObj)
        return dataObj;
    }
    for (let i = 0; i < dataObj.length; i++) {
        if (id == dataObj.data.id) {
            return dataObj.data;
        }
    }
    return { msg: '没有找到该记录' };

}

const deleteService = async (filepath, _id) => {
    let dataObj;
    await readFile(filepath).then((data) => {
        dataObj = data;
    }).catch((err) => {
        console.log(err);
    });
    if (_id) {
        let delObj = { "msg": "没有找到该记录" };
        for (let i = 0; i < dataObj.length; i++) {
            if (_id == dataObj.data[i].id) {
                delObj = dataObj.data.splice(i, 1);
                dataObj.length -= 1;
                dataObj.currentId -= 1;
                break;
            }
        }
        
        // 写文件
        if(writeFile(filepath, dataObj)) {
            return delObj;
        }
    }
    return { "msg": "参数不完整" };
}

const updateService = async (filepath, req) => {
    let _id = req.id || undefined;
    let dataObj;
    if (!_id) {
        return { "msg": "参数 id 缺失"};
    }
    await readFile(filepath).then((data) => {
        dataObj = data;
    }).catch((err) => {
        console.log(err);
    });
    for (let i = 0; i < dataObj.length; i++) {
        if (_id == dataObj.data[i].id) {
            dataObj.data[i] = req;
            // 写文件
            if(writeFile(filepath, dataObj)) {

                return req;
            } 
        }
    }
    return { "msg": "要修改的内容不存在" };
}

const updateAllService = async (filepath, req) => {
    let dataObj = JSON.parse(req.data);
    //console.log(dataObj)
    // 写文件
    if(writeFile(filepath, dataObj)) {
        await changeFile(filepath);
        return req;
    } 
    return { "msg": "要修改的内容不存在" };
}

const addService = async (filepath, req) => {
    let dataObj;
    await readFile(filepath).then((data) => {
        dataObj = data;
    }).catch((err) => {
        console.log(err);
    });
    req.id = dataObj.currentId + 1;
    dataObj.data.push(req);
    dataObj.length += 1;
    dataObj.currentId += 1;
    // 写文件
    if (writeFile(filepath, dataObj)) {
        return req;
    }
}

module.exports = {
    getService,
    deleteService,
    updateService,
    updateAllService,
    addService
}
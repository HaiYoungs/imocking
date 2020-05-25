# 目标
搭建一个小型的供前端开发者学习时调取后台接口，实现模拟数据的增删改查，支持 GET、POST 请求，基于 Node.js 文件系统，数据存储在 json 文件中。
# 前提条件
本地先自行安装node.js
# 开始使用
##### 1. 下载项目至本地，在项目根目录下运行 ```npm install```
##### 2. 在 mock 文件夹下新建 .json 文件（内容自行填充),或者使用示例文件(example.json)
##### 3. 运行 node app.js，项目默认运行在 3000 端口（可在 config.js 中修改）
##### 4. 请求 API
请求根路径为 http://localhost:3000/，完整路径为 “根路径” + “目标文件名” + “动作”。动作共有四种：
```get(获取项)、delete(删除项)、update(更新项)、add(新增项)```
**示例**
请求：url: "http://localhost:3000/example/get?id=1,method: "get"
响应：```{ "id": 1, "name": "张同学", "age": 16, "sex": "男", "height": 180 }```

+ **新增项** /add
    method: "post",
    参数：自定义文件中 data 中的键值（除 id 外）
    参数类型：Object
    
+ **删除项** /delete
    method: "get",
    参数：id,
    参数类型：Number

+ **修改项** /update
    method: "post"
    参数：要替换的对象（包括要修改项的 id）
    参数类型：Object

+ **获取项** /get
    method: "get"
    参数：id 或者 不传（返回所有记录）
    参数类型：Number


##### 5. 注意事项
为了保证模拟过程顺利，尽量使用与示例相同结构的数据
![示例文件结构]('https://github.com/HaiYoungs/imocking/blob/master/ScreenShots/json.png')
在新建一个自定义文件时，这些条件必须满足：
1. 文件后缀名为 .json
2. 字段 length、currentId、data 是必不可少的，且
3. 初始值 "length": 0, "currentId": 0, "data": [] 

const http = require('http');
const mysql  = require('mysql');
const url  = require('url')

class Sql{
  constructor(req){
    this.reqUrl=url.parse(req.url,true);
    this.query=this.reqUrl.query;//参值
    this.pathname=this.reqUrl.pathname.split("").slice(1,-1).join("");//（路径）获取请求的相关数据

    this.config={
      list:["blog","comment"]//表是否存在
      
    }
    console.log(this.pathname+req.method)
    this.connection = mysql.createConnection({
      host     : '121.43.146.149',
      user     : 'root',
      password : 'JXFjxf070815',
      database : 'mysql'
    });
    this.connection.connect();//数据库开始连接
  }
  
  get(){
    this.connection.query('SELECT '+"*"+' FROM '+this.pathname, function (error, results, fields) {
      if (error) throw error;
      console.log(results)
    });
  }
}



const hostname = '0.0.0.0';
const port = 3001;
const server = http.createServer((req, res) => { 
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');//响应设置



  let sql= new Sql(req);
  sql.get()

  res.end("ab");
}); 
/*
server.listen(port, hostname, () => { 
    console.log(`Server running at http://${hostname}:${port}/`);
});
*/


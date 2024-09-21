// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
function templateHTML(title, list, body){
    return `
    <!doctype html>
    <html>
    <head>
      <title>Comment - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">Comment</a></h1>
      ${list}
      ${body}
    </body>
    </html>
    `;
}
function templateList(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i = i + 1;
    }
    list = list + '</ul>';
    return list;
}
var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
        if(queryData.id === undefined){
            fs.readdir('./data', function(error, filelist){
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = templateList(filelist);
                var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readdir('./data', function(error, filelist){
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                    var title = queryData.id;
                    var list = templateList(filelist);
                    var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);
// Create form
// Create form in comment.js
// Change the code in comment.js as follows:
//     else if (pathname === '/create'){
//         fs.readdir('./data', function(error, filelist){
//             var
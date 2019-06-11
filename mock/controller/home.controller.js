var path = require('path');
var fs = require('fs');
module.exports = function(app) {

  app.get('/ping',function (req, res, next) {
    res.send('Server is Runing...');
  });

  app.get('/api/:name', function(req, res) {
    var file = path.join(__dirname, '../data/'+req.params.name+'.json');
    fs.readFile(file, 'utf-8', function(err, data) {
      if (err) {
        res.send('文件读取失败');
      } else {
        res.send(data);
      }
    });
  });

};

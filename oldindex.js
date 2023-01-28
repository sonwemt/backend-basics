import http from 'http';
import fs from 'fs';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const redirectTo404 = () => {
    fs.readFile('./404.html', (err, data) => {
      if(err) {
        console.log(err);
        return;
      }
      res.setHeader('Content-Length', data.length);
      res.statusCode = 404;
      res.write(data);
      return res.end();
    });
  }

  res.setHeader('Content-Type', 'text/html');
  
  if(req.url === '/') {
    fs.readFile('./index.html', (err, data) => {
      if(err) {
        console.log(err);
        return;
      }
      res.setHeader('Content-Length', data.length);
      res.statusCode = 200;
      res.write(data);
      return res.end();
    });
  } else {
    fs.readFile(`.${req.url}.html`, (err, data) => {
      if(err) {
        err.code === 'ENOENT' ? redirectTo404() : console.log(err);
        return;
      }
      res.setHeader('Content-Length', data.length);
      res.statusCode = 200;
      res.write(data);
      return res.end();
    });
  }
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});







import http from 'http';
import fs from 'fs';

const hostname = '127.0.0.1';
const port = 3000;



const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  
  if(req.url === '/') {
    const html = fs.readFileSync('./index.html', (err, data) => {
      if(err) {
        res.end();
      }
      res.setHeader('Content-Length', data.length);
      res.statusCode = 200;
    });
    res.write(html);
  } else {
    try {
      const html = fs.readFileSync(`.${req.url}.html`, (err, data) => {
        if(err) {
          res.end();
        }
        res.setHeader('Content-Length', data.length);
      });
      res.statusCode = 200;
      res.write(html);
    } catch(error) {
      const html404 = fs.readFileSync('./404.html', (err, data) => {
        if(err) {
          res.end();
        }
        res.setHeader('Content-Length', data.length);
      });
      res.statusCode = 404;
      res.write(html404);
    }
  }
  res.end();
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});







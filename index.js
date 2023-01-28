import express from "express";
import path from 'path';

const app = express();
const port = 3000;

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve('index.html'), (err) => {
    if(err) {
      return next();
    }
  });
})

app.get('/:pagename', (req, res, next) => {
  res.sendFile(path.resolve(`${req.params.pagename}.html`), {}, (err) => {
    if(err) {
      err.code === 'ENOENT' ? res.sendFile(path.resolve('404.html')): next(err);
    }
  })
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})
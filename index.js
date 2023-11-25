const express = require('express');
const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'count.json' )
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    let count = 1;
    if (data.index) {
        count = data.index;
        data.index++;
    } else {
        data.index = 1;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.write('<h1>Корневая страница</h1>');
    res.write('<span>Просмотров: </span>');
    res.write(String(count));
    res.write('<p></p>');
    fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2));
    res.end('<a href="/about">Ссылка на страницу /about</a>');

});
app.get('/about', (req, res) => {
    const data = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    let count = 1;
    if (data.about) {
        count = data.about;
        data.about++;
    } else {
        data.about = 1;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.write('<h1>Страница about</h1>');
    res.write('<span>Просмотров: </span>');
    res.write(String(count));
    res.write('<p></p>');
    fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2));
    res.end('<a href="/">Ссылка на страницу /</a>');
});

app.listen(3000);
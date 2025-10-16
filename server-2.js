import { createRequire } from "module";
import { fileURLToPath } from 'url';
import routes from './routes/routes.js';

const require = createRequire(import.meta.url);
const path = require('path');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const http = require('http');
const fs = require('fs');
//const express = require("express");
//const app = express();

//app.use('/nintendo', routes);

// https://medium.com/@carla.de.beer/configuring-your-react-app-for-aws-elastic-beanstalk-1f2e02171629

const hostname = '127.0.0.1';
const port = process.env.PORT || 8080;
console.log('pat1');
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'client/dist', req.url === '/' ? 'index.html' : req.url);
    console.log(filePath);
    const extname = path.extname(filePath);
    const contentType = getContentType(extname);

    if (fs.existsSync(filePath)) {
        try {
            const content = fs.readFileSync(filePath);
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content);
        } catch (err) {
            res.writeHead(500);
            res.end('Server Error');
        }
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

function getContentType(extname) {
    switch (extname) {
        case '.js':
            return 'text/javascript';
        case '.css':
            return 'text/css';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
            return 'image/jpeg';
        case '.gif':
            return 'image/gif';
        case '.svg':
            return 'image/svg+xml';
        default:
            return 'text/html';
    }
}

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
}).on('error', err => {
    console.error('Server error:', err);
});
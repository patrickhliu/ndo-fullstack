import { createRequire } from "module";
const require = createRequire(import.meta.url);
const helmet = require('helmet');

//import sequelize from './config/db.js';
import routes from './routes/routes.js';
const path = require('path');
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:5173",    // allow react to access this backend...
};

app.use(helmet());
//app.use(cors(corsOptions));
app.use('/nintendo', routes);
//app.use(express.static(path.join(__dirname, 'client/dist')));

const reactPath = path.join(__dirname, 'client/dist');
console.log(reactPath);
app.use(express.static(reactPath));

app.use((req, res, next) => {
    res.setHeader('Vary', 'Origin');
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome to my Express app 3908!');
});

app.get('/test', async (req, res, next) => {
    res.send("hello from test 3908....")
});

app.get("/fruits", async (req, res) => {
    res.json({ fruits: ["apple", "orange", "banana"] });
});

app.all('/{*any}', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

/* app.all('/{*splat}', (req, res) => {
    app.use(express.static(reactPath));
}); */

/* if (app.cache) {
  // To clear the cache for a specific view:
  delete app.cache['path/to/your/view.pug'];

  // To clear the entire view cache:
  for (const key in app.cache) {
    if (app.cache.hasOwnProperty(key)) {
      delete app.cache[key];
    }
  }
} */

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
import { createRequire } from "module";
const require = createRequire(import.meta.url);

//import sequelize from './config/db.js';
import routes from './routes/routes.js';

const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:5173",    // allow react to access this backend...
};

app.use(cors(corsOptions));
app.use('/nintendo', routes);
app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

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



/* app.get("/api", async (req, res) => {
    res.json({ fruits: ["apple", "orange"] });
}); */

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
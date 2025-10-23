import { createRequire } from "module";
import routes from './routes/routes.js';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);

const cors = require("cors");
const path = require('path');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const express = require("express");
const app = express();
const port = 8080;

// allow react to access this backend...
const corsOptions = {
  origin: ['ndo-fullstack-env.eba-vxxhp62q.us-west-1.elasticbeanstalk.com', 'http://ndo-fullstack-env.eba-vxxhp62q.us-west-1.elasticbeanstalk.com', "localhost:5173",]
}
app.use(cors(corsOptions))

const reactPath = path.join(__dirname, 'client/dist');
//console.log(reactPath);
app.use(express.static(reactPath));

app.use('/', routes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.get('*all', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
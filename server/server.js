import sequelize from './config/db.js';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const port = 8080;
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:5173",
};


app.use(cors(corsOptions));

app.get("/api", (req, res) => {
    res.json({ fruits: ["apple", "orange"] });
});

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
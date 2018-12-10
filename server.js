import handlers from "./core/handlers";

import express from "express";
const app = express();
const router = express.Router();

app.use('/', handlers);

app.listen(3000, () => console.log('Listening on port 3000!'));

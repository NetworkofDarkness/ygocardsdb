import handlers from "./core/handlers";

import express from "express";
const app = express();
const router = express.Router();

//app.set('json replacer', replacer); // property transformation rules
app.set('json spaces', 4); // number of spaces for indentation

app.use('/', handlers);

app.listen(3000, () => console.log('Listening on port 3000!'));

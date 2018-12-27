import express from "express";
import {  } from "fs";
const router = express.Router();

import populateDB from "../functions/populateDB";
const populate = new populateDB();

router.get("/", (req, res) => {
    populate.run()
        .then(() => res.send('DB Populated'))
    //res.send('Populate DB');
});

export default router
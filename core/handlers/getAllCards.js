import express from "express";
const router = express.Router();

import { populateDB } from "../functions/populateDB";


router.get("/", (req, res) => {
    populateDB();
    res.send("Hello World");
});

export default router
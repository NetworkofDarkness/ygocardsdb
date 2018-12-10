import express from "express";
const router = express.Router();

import populateDB from "../functions/populateDB";
const populate = new populateDB();

router.get("/", (req, res) => {
    populate.run();
    res.send("Hello World");
});

export default router
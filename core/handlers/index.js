import express from "express";
const router = express.Router();

import getAllCards from "./getAllCards";

router.use('/', getAllCards);

export default router;
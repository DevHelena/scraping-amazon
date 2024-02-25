import express from "express"
import scrapeController from "../controllers/scrape/scrapeController.js"

const router = express.Router()

router.get("/api/scrape", scrapeController)

export default router   

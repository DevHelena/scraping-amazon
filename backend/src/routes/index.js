import express from "express"
import scrape from "./scrapeRoutes.js"
import cors from "cors"

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({title: "Scrape Amazon"})
  })

  app.use(
    express.json(),
    cors(),
    scrape
  )
}

export default routes
import * as cheerio from 'cheerio'


function extractProductData(responseAmazon) {
  try {
    // Initialize cheerio and load the HTML
    const $ = cheerio.load(responseAmazon)

    // Defines classes and tags as search parameters in HTML
    const productBoxClass = "div.sg-col-4-of-24.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.AdHolder.sg-col.s-widget-spacing-small.sg-col-4-of-20"
    const titlesClass = "span.a-size-base-plus.a-color-base.a-text-normal"
    const ratingsClass = "span.a-icon-alt"
    const reviewsClass = "span.a-size-base.s-underline-text"
    const imgUrlClass = "img.s-image"

    const products = []
    // Iterates the products and gets the necessary data for the products list
    $(productBoxClass).each((index, element) => {
      const titles = $(element).find(titlesClass).text().trim()
      const ratings = $(element).find(ratingsClass).text().trim().substring(0, 3)
      const reviews = $(element).find(reviewsClass).text().trim()
      const imgUrl = $(element).find(imgUrlClass).attr('src')

      const product = {
        titles: titles,
        ratings: ratings,
        reviews: reviews,
        imgUrl: imgUrl
      }

      products.push(product)
    })

    return products
  } catch {
    console.error(error)

    res.status(400).json({ 
      message: "Error extracting product data",
      error: error.message 
    })
  }
}

export default extractProductData
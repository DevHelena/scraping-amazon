import validateKeyword from "./validateKeyword.js"
import fetchAmazonData from './fetchAmazonData.js'
import extractProductData from "./extractProductData.js"

const scrapeController = async (req, res) => {
  try {

    // Validate keyword
    const keyword = validateKeyword(req, res)

    // Define url and make request with Axios
    const urlAmazon = `https://www.amazon.com/s?k=${keyword}`

    // Build Amazon URL
    const responseAmazon = await fetchAmazonData(urlAmazon)

    // Fetch data from Amazon
    const products = extractProductData(responseAmazon)

    // Format and send response
    const response = { products: products }
    res.status(200).json(response)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error when scraping" })
  }
}

export default scrapeController
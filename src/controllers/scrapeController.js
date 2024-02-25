import axios from "axios"
import * as cheerio from 'cheerio'

const scrapeController = async (req, res) => {
  try {

    // Get de keyword
    const query = req.query
    const keyword = query.keyword

    // Check if keyword is a valid URL with Regex
    // list of disallowed characters: ; & # + | \ " '  
    /* 
      Note: Some characters are allowed by Amazon, however it is worth considering that if the user 
      searches using a character as a keyword, the resulting products may not make sense. That's why I kept 
      the special characters enabled to give the user freedom to search for whatever they want.
    */
    const regex =  /[^;\&\#\+\|\"\\' ]+/

    // Preventing errors with Keyword
    if (!req.query.hasOwnProperty("keyword")) {
      return res.status(400).json({ error: "Keyword not provided." })
    } else if (keyword === "") {
      return res.status(400).json({ error: "Keyword cannot be empty." })
    } else if (!regex.test(keyword)) {
      return res.status(400).json({ error: "Keyword contém caracteres inválidos." })
    }

    // Define url and make request with Axios
    const urlAmazon = `https://www.amazon.com/s?k=${keyword}`
    const responseAmazon = await axios.get(urlAmazon, {
      // This Header was necessary so that Amazon would not block my requests
      headers: { 
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        Host: 'www.amazon.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0'
      }
    })

    const responseAmazonData = responseAmazon.data

    const $ = cheerio.load(responseAmazonData)

    const produtos = []

    $('.sg-col-4-of-24.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.AdHolder.sg-col.s-widget-spacing-small.sg-col-4-of-20').each((index, element) => {

      const titles = $(element).find('span.a-size-base-plus.a-color-base.a-text-normal').text().trim()
      const ratings = $(element).find('span.a-icon-alt').text().trim().substring(0, 3)
      const reviews = $(element).find('span.a-size-base.s-underline-text').text().trim()
      const imgUrl = $(element).find('img.s-image').attr('src')

      const produto = {
        titles: titles,
        ratings: ratings,
        reviews: reviews,
        imgUrl: imgUrl
      }

      produtos.push(produto)
    })

    res.status(200).json({ produtos: produtos })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error when scraping" })
  }
}

export default scrapeController
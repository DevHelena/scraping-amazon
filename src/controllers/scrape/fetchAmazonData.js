import axios from "axios"

async function fetchAmazonData(urlAmazon) {
  try {
    // Make request with Axios
    const responseAmazon = await axios.get(urlAmazon, {
      headers: {
        // This Header was necessary so that Amazon would not block my requests
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        Host: "www.amazon.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0",
      },
    })
  
    return responseAmazon.data
  } catch (error) {
    console.error(error)
    
    res.status(400).json({ 
      message: "Error fetching data from Amazon",
      error: error.message 
    })
  }
}

export default fetchAmazonData
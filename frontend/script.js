// Creates the scraping API URL, replacing the specified keyword
const endpoint = (keyword) => `http://localhost:3000/api/scrape?keyword=${keyword}`

// Fetches data from the API asynchronously, handling potential errors
async function fetchData(keyword) {
  try {
    // Constructs the API URL
    const url = endpoint(keyword)

    // Requests data from the API
    const response = await fetch(url)

    // Checks if the request was successful
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.statusText)
    }

    // Parses the JSON response into a JavaScript object
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro:', error)
  }
}

// Generates product HTML from the product list
function createProductHTML(productList) {
  // Initializes HTML with a default message if the list is empty
  let productHTML = "<p>Sorry, this product is not available! :(</p>"

  // Iterates over the product list and creates HTML for each product
  if (productList.length !== 0) {
    productHTML = ""
    for (const product of productList) {
      productHTML += `
        <div class="product">
          <div class="product-information">
            <p class="title">Title</p>
            <p class="data">${product.title}</p>
          </div>
          <div class="product-information">
            <p class="title">Ratings</p>
            <p class="data">${product.ratings}</p>
          </div>
          <div class="product-information">
            <p class="title">Reviews</p>
            <p class="data">${product.reviews}</p>
          </div>
          <div class="product-information">
            <p class="title">Image URL</p>
            <p class="data">${product.imgUrl}</p>
          </div>
        </div>
      `
    }
  }

  // Displays the product HTML in the "results" div
  const resultsDiv = document.getElementById("results")
  resultsDiv.innerHTML = productHTML
}

// Retrieves HTML elements from the page
const keywordInput = document.getElementById('keywordInput')
const scrapeButton = document.getElementById('scrapeButton')
const productGroup = document.getElementById('results')
const alertElement = document.querySelector('.alert')

// Handles the search event
const handleSearch = async (event) => {
  event.preventDefault()
  alertElement.style.display = 'none'
  productGroup.style.display = 'block'

  // Gets the keyword entered by the user
  const keyword = keywordInput.value
  
  // Check for special characters
  const allowedChars = new RegExp(/^[^;\&\#+\|\"\']+$/)
  if (!allowedChars.test(keyword)) {
    alertElement.style.display = 'block'
    productGroup.style.display = 'none'
  } else {
    alertElement.style.display = 'none'
  }

  try {
    // Fetches data from the API
    const response = await fetchData(keyword)
    product = response.products

    // Generates the product HTML
    createProductHTML(product)
  } catch (error) {
    console.error(error)
  }
}

scrapeButton.addEventListener('click', handleSearch)

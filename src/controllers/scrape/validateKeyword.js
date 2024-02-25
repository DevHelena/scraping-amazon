
function validateKeyword(req, res) {
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
    if (!query.hasOwnProperty("keyword")) {
      return res.status(400).json({ error: "Keyword not provided." })
    } else if (keyword === "") {
      return res.status(400).json({ error: "Keyword cannot be empty." })
    } else if (!regex.test(keyword)) {
      // regex checking
      return res.status(400).json({ error: "Keyword contém caracteres inválidos." })
    }

    return keyword
  } catch {
    console.error(error)
    
    res.status(400).json({ 
      message: "Error validating keyword",
      error: error.message 
    })
  }
  }

export default validateKeyword
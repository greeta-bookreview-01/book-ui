const prod = {
  url: {
    KEYCLOAK_BASE_URL: "https://keycloak.greeta.net",        
    BOOK_REVIEW_API_BASE_URL: 'https://bookapi.greeta.net/book-review'
  }
}

const dev = {
  url: {
    KEYCLOAK_BASE_URL: "http://localhost:8080",      
    BOOK_REVIEW_API_BASE_URL: 'http://localhost:9000/book-review'
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod
import axios from 'axios'
import { bearerAuth } from './Helpers'

export const bookReviewApi = {
  call
}

function call(keycloak, query) {
  return instance.post('graphql', JSON.stringify({ query: query }), {
    headers: {
      'Content-type': 'application/json',
      'Authorization': bearerAuth(keycloak)
    }
  })
}

// -- Axios

const instance = axios.create({
  baseURL: window._env_ ? `${window._env_.BOOK_REVIEW_API_BASE_URL}` : 'http://localhost:9000/book-review'
})
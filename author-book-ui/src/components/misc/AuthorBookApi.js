import axios from 'axios'
import { bearerAuth } from './Helpers'

export const authorBookApi = {
  call
}

function call(keycloak, query) {
  return instance.post('graphql', JSON.stringify({ query: query }), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': bearerAuth(keycloak)
    }
  })
}

// -- Axios

const instance = axios.create({
  baseURL: window._env_ ? `${window._env_.AUTHOR_BOOK_API_BASE_URL}` : 'http://localhost:9000/author-book'
})
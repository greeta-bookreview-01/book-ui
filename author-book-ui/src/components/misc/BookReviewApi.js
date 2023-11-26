import axios from 'axios'

export const bookReviewApi = {
  call
}

function call(token, query) {
  return instance.post('graphql', { 
    query,
    headers: { 'Authorization': bearerAuth(token) }
  })
}

// -- Axios

const instance = axios.create({
  baseURL: window._env_ ? `${window._env_.BOOK_REVIEW_API_BASE_URL}` : 'http://localhost:9000/book-review'
})
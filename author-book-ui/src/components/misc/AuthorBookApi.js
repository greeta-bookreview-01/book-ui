import axios from 'axios'

export const authorBookApi = {
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
  baseURL: window._env_ ? `${window._env_.AUTHOR_BOOK_API_BASE_URL}` : 'http://localhost:9000/author-book'
})
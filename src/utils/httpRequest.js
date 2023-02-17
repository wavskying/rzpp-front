import axios from 'axios'

const httpRequest = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})

httpRequest.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  error => Promise.reject(error)
)

export default httpRequest

import axios from 'axios'

const token = import.meta.env.VITE_APP_TOKEN

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${token}`
  }
})

export default axiosInstance

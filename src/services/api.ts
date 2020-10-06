import 'dotenv/config'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://34.70.8.247/',
})

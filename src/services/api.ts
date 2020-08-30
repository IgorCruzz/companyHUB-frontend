import 'dotenv/config'
import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://company-hub-pa2lwxaela-uc.a.run.app',
})

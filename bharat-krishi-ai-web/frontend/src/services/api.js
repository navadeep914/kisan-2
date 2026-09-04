import axios from 'axios'

const API = axios.create({
  baseURL: 'https://bharat-krishi-ai.onrender.com/api'
})
export const cropAPI = {
  predict: data => API.post('/crop/predict', data),
}

export const diseaseAPI = {
  detect: formData =>
    API.post('/disease/predict', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
}

export const soilAPI = {
  predict: data => API.post('/soil/predict', data)
}

export const yieldAPI = {
  predict: data => API.post('/yield/predict', data)
}

export const marketAPI = {
  predict: data => API.post('/market/predict', data)
}

export const weatherAPI = {
  predict: data => API.post('/weather/predict', data)
}

export const schemesAPI = {
  search: data => API.post('/schemes/predict', data)
}

export const chatAPI = {
  send: data => API.post('/chatbot/predict', data)
}

export default API

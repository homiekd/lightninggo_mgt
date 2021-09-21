import axios from '@/cores/https'

export default {
  add (data) {
    return axios.post('/api/ProductBrand/Add', data)
  },
  update (data) {
    return axios.post('/api/ProductBrand/Update', data)
  },
  delete (data) {
    return axios.delete('/api/ProductBrand/Delete', data)
  },
  getMany (data) {
    return axios.get('/api/ProductBrand/FindPage', data)
  }
}

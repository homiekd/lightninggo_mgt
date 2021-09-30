import axios from '@/cores/https'

export default {
  add (data) {
    return axios.post('/api/ProductBrand/Add', data)
  },
  edit (data) {
    return axios.put('/api/ProductBrand/Update', data)
  },
  delete (data) {
    return axios.delete('/api/ProductBrand/Delete/' + data)
  },
  getMany (data) {
    return axios.post('/api/ProductBrand/FindPage', data)
  },
  get (data) {
    return axios.get('/api/ProductBrand/Get/' + data)
  }
}

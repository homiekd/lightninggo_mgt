import axios from '@/cores/https'

export default {
  add (data) {
    return axios.post('/api/SysPermission/Add', data)
  },
  update (data) {
    return axios.put('/api/SysPermission/Update', data)
  },
  getMany (data) {
    return axios.post('/api/SysPermission/FindPage', data)
  },
  get (data) {
    return axios.get('/api/SysPermission/Get/' + data)
  }
}

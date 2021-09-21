import axios from '@/cores/https'

export default {
  add (data) {
    return axios.post('/api/SysPermission/Add', data)
  },
  update (data) {
    return axios.post('/api/SysPermission/Update', data)
  },
  getMany (data) {
    return axios.get('/api/SysPermission/FindPage', data)
  }
}

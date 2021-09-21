import axios from '@/cores/https'

export default {
  add (data) {
    return axios.post('/api/SysRole/Add', data)
  },
  edit (data) {
    return axios.put('/api/SysRole/Update', data)
  },
  delete (data) {
    return axios.delete('/api/SysRole/Delete/' + data)
  },
  getMany (data) {
    return axios.post('/api/SysRole/FindPage', data)
  },
  get (data) {
    return axios.get('/api/SysRole/Get/' + data)
  }
}

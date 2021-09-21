import axios from '@/cores/https'

export default {
  login (data) {
    return axios.post('/api/SysUser/Login', data)
  },
  logout () {
    return axios.get('/api/SysUser/Logout')
  },
  getInfo () {
    return axios.get('/api/SysUser/GetInfo')
  },
  add (data) {
    return axios.post('/api/SysUser/Add', data)
  },
  edit (data) {
    return axios.put('/api/SysUser/Update', data)
  },
  delete (data) {
    return axios.delete('/api/SysUser/Delete/' + data)
  },
  getMany (data) {
    return axios.post('/api/SysUser/FindPage', data)
  },
  getUsetRoles (data) {
    return axios.get('/api/SysUser/GetUserRoles/' + data)
  },
  get (data) {
    return axios.get('/api/SysUser/Get/' + data)
  }
}

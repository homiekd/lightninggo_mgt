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
  }
}

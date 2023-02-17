import axios from 'axios'

export default () => {
  return axios.create({
    // fn to return connector which is axios obj
    baseURL: `http://localhost:8081/`
  })
}

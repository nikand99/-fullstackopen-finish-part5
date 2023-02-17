import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  // console.log('newObject:', newObject)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  // return request.then(response => response.data)
  console.log('response.data', response.data )
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove, setToken }

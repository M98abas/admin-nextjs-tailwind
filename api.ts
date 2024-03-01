// api.js
import axios from 'axios'
import Cookies from 'js-cookie'
export const BASE_URL = 'http://localhost:4000/v1' // Replace this with your API base URL
//  await Cookies.set('subCourse',client.titleEn)
export const ApiLogin = (route, info, callback) => {
  const headers = {
    'Content-Type': 'application/json',
  }

  const data = JSON.stringify(info)

  axios
    .post(`${BASE_URL}/${route}/login`, data, { headers })
    .then((response) => {
      const result = response.data
      if (result.status) {
        callback(result, null)
      } else {
        callback(null, result.errMsg)
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
}

export const ApiRegister = (route, info, callback) => {
  const myHeaders = {
    'Content-Type': 'application/json',
  }

  axios
    .post(`${BASE_URL}/${route}/register`, info, { headers: myHeaders })
    .then((response) => {
      const result = response.data
      if (result.status) {
        return callback(result, null)
      }
      callback(null, result.errMsg)
    })
    .catch((error) => {
      console.log('error', error)
    })
}

export const ApiUpdateData = (route, info, callback) => {
  const token = Cookies.get('token')
  const headers = {
    token,
    'Content-Type': 'application/json',
  }
  console.log(route, info.id)

  const data = JSON.stringify(info)

  axios
    .put(`${BASE_URL}/${route}/update/${info.id}`, data, { headers })
    .then((response) => {
      const result = response.data
      if (result.status) {
        callback(result, null)
      } else {
        callback(null, result.errMsg)
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
}

// isModalActiveActive
export const ApiActivateData = (route, info, callback) => {
  const token = Cookies.get('token')
  const headers = {
    token,
    'Content-Type': 'application/json',
  }
  console.log(route, info.id)

  const data = JSON.stringify(info)

  axios
    .put(`${BASE_URL}/${route}/${info.id}`, data, { headers })
    .then((response) => {
      const result = response.data
      if (result.status) {
        callback(result, null)
      } else {
        callback(null, result.errMsg)
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
}

export const ApiAddData = (route, info, callback) => {
  const token = Cookies.get('token')

  const headers = {
    token,
    'Content-Type': 'application/json',
  }
  console.log(route, info.id)

  const data = JSON.stringify(info)

  axios
    .post(`${BASE_URL}/${route}`, data, { headers })
    .then((response) => {
      const result = response.data
      if (result.status) {
        callback(result, null)
      } else {
        callback(null, result.errMsg)
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
}

export const ApiDeleteData = (route: string, id: number, callback) => {
  const token = Cookies.get('token')

  const headers = {
    token,
    'Content-Type': 'application/json',
  }
  console.log({ headers })

  axios
    .get(`${BASE_URL}/${route}/delete/${id}`, { headers })
    .then((response) => {
      console.log(response)
      const result = response.data
      if (result.status) {
        callback(result, null)
      } else {
        callback(null, result.errMsg)
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
}

export const ApiGetData = (route, callback) => {
  const token = Cookies.get('token')
  const headers = {
    token,
    'Content-Type': 'application/json',
  }

  axios
    .get(`${BASE_URL}/${route}`, { headers })
    .then((response) => {
      const result = response.data
      if (result.status) {
        callback(result.data, null)
      } else {
        callback(null, result.errMsg)
      }
    })
    .catch((error) => {
      console.log('error', error)
    })
}

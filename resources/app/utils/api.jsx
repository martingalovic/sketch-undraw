import axios from 'axios'

const endpoint = 'https://undraw-api.herokuapp.com'

export function getList(page) {
  return axios.post(endpoint + '/list?page=' + page, {page: page})
}

export function getSearch(terms) {
  return axios.post(endpoint + '/search', {terms: terms})
}

export function getImage(url, color) {
  return axios.post(endpoint + '/svg/get', {
    url: url,
    color: color
  })
}

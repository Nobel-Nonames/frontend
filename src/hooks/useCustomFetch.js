import axios from 'axios'

async function useCustomFetch(url, body) {
  let accessToken = localStorage.getItem('accessToken')
  const result = await axios(process.env.VUE_APP_API_SERVER_URL + url, {
    body,
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  }).then(r => r.data)
    .catch(err => err.response.data)

  return result
}

export { useCustomFetch }
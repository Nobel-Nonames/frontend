import axios from 'axios'

async function useAuthCheck() {
  let isLoggedIn = false
  let accessToken = localStorage.getItem('accessToken')
  let result = await axios(process.env.VUE_APP_API_SERVER_URL + '/api/auth/@me', {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  }).then(r => r.data)
    .catch(err => err.response.data)

  if (result.success)
    isLoggedIn = true

  return { isLoggedIn, result }
}

export { useAuthCheck }
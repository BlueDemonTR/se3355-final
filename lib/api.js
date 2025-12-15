import axios from "axios"

// BUILD URL PROPS FOR GET AND DELETE REQUESTS
function buildURLParams(params) {
	if(!params || !Object.keys(params).length) return ''
	return '?' + new URLSearchParams(params).toString()
}

const Api = {
  async get(endpoint, params = {}) {

		const apiUrl = `${endpoint}${buildURLParams(params)}`
    
		try {
			const req = await axios.get(apiUrl)
			if(req.status === 202) {
				console.log(req.data)
        
        return true
			}

			return req.data
		} catch (e) {
			if(e?.response?.data?.includes('Bad Gateway')) return

			console.warn(e && e.response ? e.response.data : 'Something went wrong!')
      console.log(e)
      
			return false
		}
  }
}

export default Api
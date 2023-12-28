import axios from "axios"
const apiInstance = axios.create({
    baseURL: "https://vendo-server.up.railway.app/"
})

//Always include cookiess
apiInstance.defaults.withCredentials = true

export default apiInstance

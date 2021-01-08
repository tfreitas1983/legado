import axios from 'axios'

export default axios.create({
   //baseURL: "http://apihoramarcada.ddns.net:5099/api",
   baseURL: "http://sysdoctor.ddns.net:5099/api",
    headers: {
        "Content-type": "application/json"
    }
})
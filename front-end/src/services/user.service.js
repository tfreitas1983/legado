import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://apihoramarcada.ddns.net:5099/api/test/';
//const API_URL = 'http://sysdoctor.ddns.net:5099/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
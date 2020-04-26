import axios from 'axios'

const authToken = localStorage.getItem('authToken');

if (authToken) {
    axios.defaults.headers['Auth-Token'] = authToken;
}

export const httpClient = axios;

import axios from 'axios'

const authToken = localStorage.getItem('authToken');

if (authToken) {
    axios.defaults.headers.authToken = authToken;
}

export const httpClient = axios;

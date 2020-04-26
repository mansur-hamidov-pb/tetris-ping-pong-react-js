import { API_URL } from '../../consts';
import { httpClient } from '../../httpClient';

export class UserService {
    constructor (httpClient, publicUrl) {
        this.publicUrl = publicUrl;
        this.httpClient = httpClient;
    }

    path = '/user';

    getData () {
        return this.httpClient.get(`${this.publicUrl}${this.path}`);
    }

    signUp (data) {
        return this.httpClient.post(`${this.publicUrl}${this.path}`, data);
    }

    signIn (data) {
        return this.httpClient.post(`${this.publicUrl}${this.path}/signin`, data);
    }

    signOut () {
        return this.httpClient.post(`${this.publicUrl}${this.path}/signout`);
    }

    getIP () {
        return this.httpClient.get(`${this.publicUrl}${this.path}/ip`);
    }

    getLocationByIp (ip) {
        return this.httpClient.get(`https://www.iplocate.io/api/lookup/${ip}`);
    }
}

export const userService = new UserService(httpClient, API_URL);
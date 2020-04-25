import { API_URL } from '../../consts';
import { httpClient } from '../../httpClient';

export class UserService {
    constructor (httpClient, publicUrl) {
        this.publicUrl = publicUrl;
        this.httpClient = httpClient;
    }

    path = '/hi-score';

    setHiScore (score) {
        return this.httpClient.post(`${this.publicUrl}${this.path}`);
    }

    getHiScore (data) {
        return this.httpClient.post(`${this.publicUrl}${this.path}`, data);
    }

    signIn (data) {
        return this.httpClient.post(`${this.publicUrl}${this.path}/signin`, data);
    }

    signOut () {
        return this.httpClient.post( `${this.publicUrl}${this.path}/signout`);
    }
}

export const userService = new UserService(httpClient, API_URL);
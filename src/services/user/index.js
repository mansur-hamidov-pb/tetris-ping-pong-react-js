import { httpClient } from '../../httpClient';
import Axios from 'axios';

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
        return this.httpClient.post( `${this.publicUrl}${this.path}/signout`);
    }
}

export const userService = new UserService(httpClient, 'http://brickbreaker.local');
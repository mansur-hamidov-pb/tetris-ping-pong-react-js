import md5 from 'md5';

import { API_URL } from '../../consts';
import { httpClient } from '../../httpClient';

export class UserService {
    constructor (httpClient, publicUrl) {
        this.publicUrl = publicUrl;
        this.httpClient = httpClient;
    }

    path = '/hi-score';

    setHiScore (score) {
        const verificationToken = this.generateValidationToken(score);
        return this.httpClient.post(`${this.publicUrl}${this.path}`, { score, verificationToken });
    }

    getHiScore () {
        return this.httpClient.get(`${this.publicUrl}${this.path}`);
    }

    getRating () {
        return this.httpClient.get(`${this.publicUrl}${this.path}/rating`);
    }

    signIn (data) {
        return this.httpClient.post(`${this.publicUrl}${this.path}/signin`, data);
    }

    signOut () {
        return this.httpClient.post( `${this.publicUrl}${this.path}/signout`);
    }

    generateValidationToken (score) {
        const authToken = this.httpClient.defaults.headers['Auth-Token'];
        return md5(md5(score) + md5(authToken) + authToken + md5(authToken + score));
    }
}

export const hiScoreService = new UserService(httpClient, API_URL);
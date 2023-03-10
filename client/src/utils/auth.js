import decode from 'jwt-decode';

class AuthService {
    getUser() {
        return decode(this.getToken());
    };

    getToken() {
        return localStorage.getItem('id_token');
    };

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/profile');
    }
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/')
    }
    loggedIn() {
        const token = this.getToken();
        return token ? true: false;
    }
}

export default new AuthService();
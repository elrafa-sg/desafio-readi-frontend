
class LocalStorage {
    static setUserToken = (token: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("userToken", token);
        } else {
            return null
        }
    };

    static getUserToken () {
        if (typeof window !== 'undefined') {
            return localStorage.getItem("userToken");
        } else {
            return null
        }
    };

    static setUserEmail (email: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem("userEmail", email);
        } else {
            return null
        }
    }

    static getUserEmail () {
        if (typeof window !== 'undefined') {
            return localStorage.getItem("userEmail");
        } else {
            return null
        }
    }

    static clearUserData () {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("userToken");
            localStorage.removeItem("userEmail");
        } else {
            return null
        }
    };

}

export { LocalStorage }
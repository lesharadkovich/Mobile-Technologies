class Http {
    static checkError(res) {
        if (!res.ok)  throw res;

        return res;
    }

    static handleError(err) {
        alert(err.message);
    }

    static get(url) {
        return fetch(url, {
            method: 'GET',
            headers: new Headers({ Accept: 'application/json' }),
        })
            .then(res => res.json())
            .then(Http.checkError)
            .catch(Http.handleError)
    }

    static post(url, body) {
        return fetch(url, {
            method: 'POST',
            body,
            headers: new Headers({ Accept: 'application/json' }),
        })
            .then(res => res.json())
            .then(Http.checkError)
            .catch(Http.handleError)
    }
}

class MoviesService {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'https://movielibraryapi-bstu-mt.herokuapp.com';
    }

    async getAllMovies() {
        const url = `${this.baseUrl}/library`;
        const result = await Http.get(url);

        return result || [];
    }
}

export const moviesService = new MoviesService();

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

    static post(url, body, contentType = 'application/json') {
        return fetch(url, {
            method: 'POST',
            body,
            headers: new Headers({
                Accept: 'application/json',
                'Content-Type': contentType
            }),
        })
            .then(res => res.json())
            .then(Http.checkError)
            .catch(Http.handleError)
    }
}

class MoviesService {
    baseUrl;

    constructor() {
        this.baseUrl = 'https://movielibraryapi-bstu-mt.herokuapp.com';
    }

    async getAllMovies() {
        const url = `${this.baseUrl}/library`;
        const result = await Http.get(url);

        return result || [];
    }

    async createNewMovie(name, director, description, image) {
        const data = new FormData();

        data.append('name', name);
        data.append('director', director);
        data.append('description', description);
        if (image) {
            data.append('photo', {
                uri: image.uri,
                type: image.type,
                name: image.fileName,
                data: image.data
            });
        }


        return Http.post(`${this.baseUrl}/library`, data, 'multipart/form-data')
    }
}

export const moviesService = new MoviesService();

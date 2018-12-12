class Http {
    static checkError(res) {
        if (!res.ok)  throw res;

        return res;
    }

    static async handleError(err) {
        console.log('Error: ', err);

        let resultError;
        try {
            let errorBody = await err.json();
            resultError = errorBody.message;
        } catch (_err) {
            resultError = 'Internal Server Error';
        }

        throw resultError;
    }

    static get(url) {
        return fetch(url, {
            method: 'GET',
            headers: new Headers({ Accept: 'application/json' }),
        })
            .then(Http.checkError)
            .then(res => res.json())
            .catch(Http.handleError);
    }

    static async post(url, body, contentType = 'application/json') {
        return await fetch(url, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': contentType
            }
        })
            .then(Http.checkError)
            .then(res => res.json())
            .catch(Http.handleError)
    }
}

class MoviesService {
    baseUrl;

    constructor() {
        // this.baseUrl = 'https://movielibraryapi-bstu-mt.herokuapp.com';
        this.baseUrl = 'https://6e41d2a9.ngrok.io';
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
        data.append('imageurl', {
            uri: image.uri,
            type: image.type, // or photo.type
            name: image.fileName
        });

        await Http.post(`${this.baseUrl}/library`, data, 'multipart/form-data')
    }

    fetchImage(imageUrl) {
        if (!imageUrl) {
            return '';
        }

        if (imageUrl.startsWith('http')) {
            return imageUrl;
        }

        return `${this.baseUrl}/${imageUrl}`;
    }
}

export const moviesService = new MoviesService();

class Http {
    static checkError(res) {
        if (!res.ok)  {
            console.log('Error on server: ', res);
            throw res.statusText || 'Internal Server Error';
        }

        return res;
    }

    static get(url) {
        return fetch(url, {
            method: 'GET',
            headers: new Headers({ Accept: 'application/json' }),
        })
            .then(Http.checkError)
            .then(res => res.json())
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
    }

    static async delete(url, contentType = 'application/json') {
        return await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': contentType
            }
        })
            .then(Http.checkError)
    }
}

class MoviesService {
    baseUrl;

    constructor() {
        // this.baseUrl = 'https://movielibraryapi-bstu-mt.herokuapp.com';
        this.baseUrl = 'https://fe42eebb.ngrok.io';
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
            data.append('imageurl', {
                uri: image.uri,
                type: image.type, // or photo.type
                name: image.fileName
            });
        } else {
            data.append('imageurl', 'https://timedotcom.files.wordpress.com/2017/05/star-wars_1024.jpg');
        }

        await Http.post(`${this.baseUrl}/library`, data, 'multipart/form-data')
    }

    async deleteMovie(id) {
        await Http.delete(`${this.baseUrl}/movie/${id}`);
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

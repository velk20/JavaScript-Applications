import * as userService from '../services/userService.js';

export const request = (method, url, data) => {
    const options = {
        method,
        headers: {},
    }
    
    const token = userService.getAccessToken();

    if (token) {
        options.headers['X-Authorization'] = token;
    }

    if (data) {
        options.headers['Content-Type'] = 'application/json';

        if (method != 'GET') {
            options.body = JSON.stringify(data);
        }
    }

    return fetch(url, options)
        .then(res => res.json());
};

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const put = request.bind({}, 'PUT');
export const del = request.bind({}, 'DELETE');
import * as userService from './userService.js';

export const request = (method, url, data) => {
    let options = {};
    let token = userService.getAccessToken();

    if (method != 'GET') {
        options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (token) {
            options.headers['X-Authorization'] = token;
        }

        if (data) {
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
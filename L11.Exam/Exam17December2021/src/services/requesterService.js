import * as request from '../api/requester.js';
import * as userService from './userService.js';

const url = 'http://localhost:3030';
const baseUrl = `${url}/users`;
const createUrl = `${url}/data/memes`;
const allMemesUrl = `${url}/data/memes?sortBy=_createdOn%20desc`;
const memeDetailsUrl = `${url}/data/memes`;
const editMemeUrl = `${url}/data/memes`;
const deleteMemeUrl = `${url}/data/memes`;
const userMemesUrl = (userId) => `${url}/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`

export const login = (email, password) =>
    request.post(`${baseUrl}/login`, { email, password })
        .then(user => userService.saveUser(user));

export const register = (data) =>
    request.post(`${baseUrl}/register`, data)
        .then(user => userService.saveUser(user));

export const logout = () =>
    request.get(`${baseUrl}/logout`, { headers: { 'X-Authorization': userService.getAccessToken() } })
        .then(() => userService.removeUser());

export const createMeme = (data) => request.post(createUrl, data);

export const getAllMemes = () => request.get(allMemesUrl);

export const memeDetails = (memeId) => request.get(`${memeDetailsUrl}/${memeId}`);

export const editMeme = (memeId, data) => request.put(`${editMemeUrl}/${memeId}`, data);

export const deleteMeme = (memeId) => request.del(`${deleteMemeUrl}/${memeId}`);

export const getUserMemems = (userId) => request.get(userMemesUrl(userId));
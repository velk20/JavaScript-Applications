import * as request from '../api/requester.js';
import * as userService from './userService.js';

const url = 'http://localhost:3030';
const baseUrl = `${url}/users`;
const theatersUrl = `${url}/data/theaters?sortBy=_createdOn%20desc&distinct=title`;
const theatersAllUrl = `${url}/data/theaters`;
const theaterDetailsUrl = (theaterId) => `${theatersAllUrl}/${theaterId}`;
const editTheaterUrl = (theaterId) => `${theatersAllUrl}/${theaterId}`;
const deleteTheaterUrl = (theaterId) => `${theatersAllUrl}/${theaterId}`;
const listTheatersUrl = (userId) => `${url}/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`;
const likeUrl = `${url}/data/likes`;
const likesTheaterUrl = (theaterId) => `${url}/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`;
const eventLikesUrl = (theaterId, userId) => `${url}/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`;

export const login = (email, password) =>
    request.post(`${baseUrl}/login`, { email, password })
        .then(user => userService.saveUser(user));

export const register = (email, password) =>
    request.post(`${baseUrl}/register`, { email, password })
        .then(user => userService.saveUser(user));

export const logout = () =>
    request.get(`${baseUrl}/logout`, { headers: { 'X-Authorization': userService.getAccessToken() } })
        .then(() => userService.removeUser());

export const getAllTheaters = () => request.get(theatersUrl);

export const createTheater = (data) => request.post(theatersAllUrl, data);

export const getTheaterDetails = (theaterId) => request.get(theaterDetailsUrl(theaterId));

export const editTheater = (theaterId, data) => request.put(editTheaterUrl(theaterId), data);

export const deleteTheater = (theaterId) => request.del(deleteTheaterUrl(theaterId));

export const getListTheaters = (userId) => request.get(listTheatersUrl(userId));

export const addLike = (theaterId) => request.post(likeUrl, { theaterId });

export const getLikesTheater = (theaterId) => request.get(likesTheaterUrl(theaterId));

export const getLikesEvent = (theaterId, userId) => request.get(eventLikesUrl(theaterId, userId));
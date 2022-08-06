import * as request from '../api/requester.js';
import * as userService from './userService.js';

const url = 'http://localhost:3030';
const baseUrl = `${url}/users`;
const allGamesUrl = `${url}/data/games?sortBy=_createdOn%20desc`;
const newGamesUrl = `${url}/data/games?sortBy=_createdOn%20desc&distinct=category`;
const createGameUrl = `${url}/data/games`;
const createCommentUrl = `${url}/data/comments`;

export const login = (email, password) =>
    request.post(`${baseUrl}/login`, { email, password })
        .then(user => userService.saveUser(user));

export const register = (email, password) =>
    request.post(`${baseUrl}/register`, { email, password })
        .then(user => userService.saveUser(user));

export const logout = () =>
    request.get(`${baseUrl}/logout`, { headers: { 'X-Authorization': userService.getAccessToken() } })
        .then(() => userService.removeUser());

export const getAllGames = () => request.get(allGamesUrl);

export const getNewGames = () => request.get(newGamesUrl);

export const createGame = (data) => request.post(createGameUrl, data);

export const gameDetails = (gameId) => request.get(`${createGameUrl}/${gameId}`);

export const editGame = (gameId, data) => request.put(`${createGameUrl}/${gameId}`, data);

export const deleteGame = (gameId) => request.del(`${createGameUrl}/${gameId}`);

export const loadComments = (gameId) =>
    request.get(`${url}/data/comments?where=gameId%3D%22${gameId}%22`);

export const createComment = (gameId, comment) => request.post(createCommentUrl, { gameId, comment });
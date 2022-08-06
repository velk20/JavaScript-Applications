import * as request from '../api/requester.js';
import * as userService from '../services/userService.js';

const baseUrl = 'http://localhost:3030/users';
const allBooksUrl = 'http://localhost:3030/data/books?sortBy=_createdOn%20desc';
const createBookUrl = 'http://localhost:3030/data/books';
const likeBookUrl = 'http://localhost:3030/data/likes';

export const loginUser = (email, password) =>
    request.post(`${baseUrl}/login`, { email, password })
        .then(user => userService.saveUser(user));

export const registerUser = (email, password) =>
    request.post(`${baseUrl}/register`, { email, password })
        .then(user => userService.saveUser(user));

export const logout = () => request.get(`${baseUrl}/logout`,
    { headers: { 'X-Authorization': userService.getAccessToken() } })
    .then(() => userService.removeUser());

export const getAllBooksByUserId = (userId) =>
    request.get(`http://localhost:3030/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);

export const getAllBooks = () => request.get(allBooksUrl);

export const getBookById = (bookId) => request.get(`${createBookUrl}/${bookId}`);

export const createBook = (data) => request.post(createBookUrl, data);

export const editBook = (bookId, data) => request.put(`${createBookUrl}/${bookId}`, data);

export const deleteBookById = (bookId) => request.del(`${createBookUrl}/${bookId}`);

export const likeBookById = (bookId) => request.post(likeBookUrl,  {bookId });

export const getBookLikes = (bookId) =>
    request.get(`http://localhost:3030/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);

export const likeForSpecificUser = (bookId, userId) =>
    request.get(`http://localhost:3030/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
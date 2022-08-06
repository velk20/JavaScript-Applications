import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as requestService from '../services/requesterService.js';
import * as userService from '../services/userService.js';

const detailsTemplate = (book, isOwner, likes, showLikeBtn, onLike) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">Type: ${book.type}</p>
            <p class="img"><img src="${book.imageUrl}"></p>
            <div class="actions">
    
                ${isOwner ? html`
                <a class="button" href="/data/books/${book._id}/edit">Edit</a>
                <a class="button" href="/data/books/${book._id}/delete">Delete</a>
                ` : nothing}
    
                ${likeControlsTemplate(showLikeBtn, onLike)}
    
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: ${likes}</span>
                </div>
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>
`;

const likeControlsTemplate = (showLikeBtn, onLike) => {
    if (showLikeBtn) {
        return html`<a @click=${onLike} class="button like" href="javascript:void(0)">Like</a>`;
    } else {
        return null;
    }
}

export const detailsView = async (ctx) => {
    const bookId = ctx.params.id;

    const onLike = () => {
        requestService.likeBookById(bookId)
            .then(() => ctx.page.redirect(`/data/books/${bookId}`));
    }

    const user = userService.getUser();

    const [book, likes, hasLike] = await Promise.all([
        requestService.getBookById(bookId),
        requestService.getBookLikes(bookId),
        user ? requestService.likeForSpecificUser(bookId, user._id) : 0
    ]);

    const isOwner = user && user._id == book._ownerId;
    const showLikeBtn = user && isOwner == false && hasLike == false;

    ctx.render(detailsTemplate(book, isOwner, likes, showLikeBtn, onLike));
}
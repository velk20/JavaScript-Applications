import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as requestService from '../services/requesterService.js';
import * as userService from '../services/userService.js';

const detailsTemplate = (theater, onLike, isOwner, likes, showLikeBtn) => html`
    <section id="detailsPage">
        <div id="detailsBox">
            <div class="detailsInfo">
                <h1>Title: ${theater.title}</h1>
                <div>
                    <img src="${theater.imageUrl}" />
                </div>
            </div>
    
            <div class="details">
                <h3>Theater Description</h3>
                <p>${theater.description}</p>
                <h4>Date: ${theater.date}</h4>
                <h4>Author: ${theater.author}</h4>
    
                <div class="buttons">
                    ${isOwner ? html`
                    <a class="btn-delete" href="/data/theaters/${theater._id}/delete">Delete</a>
                    <a class="btn-edit" href="/data/theaters/${theater._id}/edit">Edit</a>
                    `: nothing}
    
                    ${likeControlsTemplate(showLikeBtn, onLike)}
                </div>
    
                <p class="likes">Likes: ${likes}</p>
            </div>
        </div>
    </section>
`;

const likeControlsTemplate = (showLikeBtn, onLike) => {
    if (showLikeBtn) {
        return html`<a @click=${onLike} class="btn-like" href="#">Like</a>`;
    } else {
        return null;
    }
}

export const detailsView = async (ctx) => {
    const theaterId = ctx.params.id;

    const onLike = () => {
        requestService.addLike(theaterId)
            .then(() => ctx.page.redirect(`/data/theaters/${theaterId}`));
    }

    const user = userService.getUser();

    const [theater, likes, hasLike] = await Promise.all([
        requestService.getTheaterDetails(theaterId),
        requestService.getLikesTheater(theaterId),
        user ? requestService.getLikesEvent(theaterId, user._id) : 0
    ]);

    const isOwner = user && user._id == theater._ownerId;
    const showLikeBtn = user && isOwner == false && hasLike == false;

    ctx.render(detailsTemplate(theater, onLike, isOwner, likes, showLikeBtn));
}
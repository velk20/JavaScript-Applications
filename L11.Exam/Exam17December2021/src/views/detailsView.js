import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { notificationHandler } from '../handlers/notificationHandler.js';

import { DELETE_MEME_CONFIRM_MESSAGE } from '../messages/confirmMessage.js';
import * as requestService from '../services/requesterService.js';

const detailsTemplate = (deleteHandler, meme, isOwner) => html`
    <section id="meme-details">
        <h1>Meme Title: ${meme.title}</h1>
        <div class="meme-details">
            <div class="meme-img">
                <img alt="meme-alt" src="${meme.imageUrl}">
            </div>
            <div class="meme-description">
                <h2>Meme Description</h2>
                <p>${meme.description}</p>
    
                ${isOwner ? html`
                <a class="button warning" href="/data/memes/${meme._id}/edit">Edit</a>
                <button @click=${deleteHandler} class="button danger">Delete</button>` : nothing}
            </div>
        </div>
    </section>
`;

export const detailsView = (ctx) => {
    const memeId = ctx.params.id;

    const deleteHandler = () => {
        const confirmed = DELETE_MEME_CONFIRM_MESSAGE();

        if (confirmed) {
            requestService.deleteMeme(memeId)
                .then(() => ctx.page.redirect('/catalog'));
        }
    }

    requestService.memeDetails(memeId)
        .then(meme => {
            const user = ctx.user;
            let isOwner = false;

            if (user) {
                isOwner = ctx.user._id == meme._ownerId;
            }

            ctx.render(detailsTemplate(deleteHandler, meme, isOwner))
        });
}
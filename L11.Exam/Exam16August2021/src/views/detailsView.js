import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import { inputValidator } from '../validators/inputValidator.js';
import { commentsView } from './commentsView.js';

import * as alertConsole from '../messages/alertMessage.js';
import * as requestService from '../services/requesterService.js';

const detailsTemplate = (game, displayCommentSection, isOwner, commentsSection, onSubmit) => html`
    <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
    
            <div class="game-header">
                <img class="game-img" src="${game.imageUrl}" />
                <h1>${game.title}</h1>
                <span class="levels">${game.title}</span>
                <p class="type">${game.category}</p>
            </div>
    
            <p class="text">${game.summary}</p>
    
            ${commentsSection}
    
            ${isOwner ? html`
            <div class="buttons">
                <a href="/data/games/${game._id}/edit" class="button">Edit</a>
                <a href="/data/games/${game._id}/delete" class="button">Delete</a>
            </div>
            `: nothing}
        </div>
    
        ${displayCommentSection
        ? nothing
        : html`
        <article class="create-comment">
            <label>Add new comment:</label>
            <form @submit=${onSubmit} class="form">
                <textarea name="comment" placeholder="Comment......"></textarea>
                <input class="btn submit" type="submit" value="Add Comment">
            </form>
        </article>`}
    </section>
`;

export const detailsView = async (ctx) => {
    const gameId = ctx.params.id;

    const [game, commentsSection] = await Promise.all([
        requestService.gameDetails(gameId),
        commentsView(gameId)
    ]);

    requestService.gameDetails(gameId)
        .then(() => {
            const isOwner = ctx.user && ctx.user._id == game._ownerId;
            const user = ctx.user;
            const displayCommentSection = isOwner || !user;
            ctx.render(detailsTemplate(game, displayCommentSection, isOwner, commentsSection, onSubmit));
        });

    const onSubmit = (ev) => {
        ev.preventDefault();

        const { comment } = Object.fromEntries(new FormData(ev.currentTarget));

        const isInputValid = inputValidator([comment]);

        if (!isInputValid) {
            alertConsole.ENTER_VALID_COMMENT_MESSAGE();
            return;
        }

        ev.currentTarget.reset();

        requestService.createComment(gameId, comment)
            .then((ctx.page.redirect(`/data/games/${gameId}`)));
    }
}
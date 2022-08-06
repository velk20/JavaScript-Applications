import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import * as requestService from '../services/requesterService.js';

const commentsTemplate = (comments) => html`
    <div class="details-comments">
        <h2>Comments:</h2>
        <ul>
            ${comments.length > 0
            ? comments.map(comment => commentTemplate(comment))
            : html`<p class="no-comment">No comments.</p>`
            }
        </ul>
    </div>
`;
const commentTemplate = (comment) => html`
    <li class="comment">
        <p>Content: ${comment.comment}</p>
    </li>
`;

export const commentsView = async (gameId) => {
    const comments = await requestService.loadComments(gameId)
    return commentsTemplate(comments);
}
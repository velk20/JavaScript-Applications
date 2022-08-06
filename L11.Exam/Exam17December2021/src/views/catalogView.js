import { html } from '../../node_modules/lit-html/lit-html.js';

import * as requestService from '../services/requesterService.js';

const catalogTemplate = (memes) => html`
    <section id="meme-feed">
        <h1>All Memes</h1>
        <div id="memes">
            ${memes.length > 0 ? 
            memes.map(meme => memeTemplate(meme))
            : html`<p class="no-memes">No memes in database.</p>`}
        </div>
    </section>
`;

const memeTemplate = (meme) => html`
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${meme.title}</p>
                <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
            </div>
            <div id="data-buttons">
                <a class="button" href="/data/memes/${meme._id}">Details</a>
            </div>
        </div>
    </div>
`;

export const catalogView = (ctx) => {
    requestService.getAllMemes()
        .then(memes => ctx.render(catalogTemplate(memes)));
}
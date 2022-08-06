import { html } from '../../node_modules/lit-html/lit-html.js';

import * as requestService from '../services/requesterService.js';

const catalogTemplate = (games) => html`
    <section id="catalog-page">
        <h1>All Games</h1>

        ${games.length > 0
            ? games.map(gameTemplate)
            : html`<h3 class="no-articles">No articles yet</h3>`
        }
    </section>
`;

const gameTemplate = (game) => html`
    <div class="allGames">
        <div class="allGames-info">
            <img src="${game.imageUrl}">
            <h6>${game.category}</h6>
            <h2>${game.title}</h2>
            <a href="/data/games/${game._id}" class="details-button">Details</a>
        </div>
    </div>
`;

export const catalogView = (ctx) => {
    requestService.getAllGames()
        .then(games => ctx.render(catalogTemplate(games)));
}
import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as requestService from '../services/requesterService.js';

const catalogTemplate = (albums, user) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>
    
        ${albums.length == 0
        ? html`<p> No Albums in Catalog!</p>`
        : albums.map(x => albumTemplate(x, user))}
    </section>
`;

export const albumTemplate = (album, user) => html`
    <div class="card-box">
        <img src="${album.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
    
            ${user ? html`
            <div class="btn-group">
                <a href="/albums/${album._id}" id="details">Details</a>
            </div>`: nothing}
        </div>
    </div>
`;

export const catalogView = (ctx) => {
    requestService.getAllAlbums()
        .then(albums => {
            ctx.render(catalogTemplate(albums, ctx.user));
        });
}
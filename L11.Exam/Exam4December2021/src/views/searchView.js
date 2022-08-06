import { html } from '../../node_modules/lit-html/lit-html.js';
import * as requestService from '../services/requesterService.js';
import { albumTemplate } from './catalogView.js';

const searchTemplate = (albums, user, onClick) => html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button @click=${onClick} class="button-list">Search</button>
        </div>
    
        <h2>Results:</h2>
    
        <div class="search-result">
            ${albums.length > 0
             ? albums.map(x => albumTemplate(x, user))
             : html`<p class="no-result">No result.</p>`
            }
        </div>
    </section>
`;

export const searchView = (ctx) => {
    const onClick = (ev) => {
        ev.preventDefault();

        const searchInputField = document.getElementById('search-input');
        const searchValue = searchInputField.value.trim();

        if (!searchValue) {
            alert('Enter album name!');
            return;
        }
        
        requestService.searchAlbums(searchValue)
            .then(albums => {
                ctx.render(searchTemplate(albums, ctx.user, onClick));
            });
    }

    ctx.render(searchTemplate([], ctx.user, onClick));
} 
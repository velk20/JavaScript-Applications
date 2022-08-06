import { html } from '../../node_modules/lit-html/lit-html.js';

import * as requestService from '../services/requesterService.js';
import { bookTemplate } from './dashboardView.js';

const userBooksTemplate = (books) => html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
    
        ${books.length > 0
        ? html`
        <ul class="my-books-list">
            ${books.map(x => bookTemplate(x))}
        </ul>`
         : html`<p class="no-books">No books in database!</p>`}
    </section>
`;

export const userBooksView = (ctx) => {
    requestService.getAllBooksByUserId(ctx.user._id)
        .then(books=> ctx.render(userBooksTemplate(books)));
}
import { html } from '../../node_modules/lit-html/lit-html.js';

import * as alertConsole from '../messages/alertMessages.js';
import * as requestService from '../services/requesterService.js';

import { inputValidator } from '../validators/inputValidator.js';

const editTemplate = (book, onSubmit) => html`
    <section id="edit-page" class="edit">
        <form @submit=${onSubmit} id="edit-form" action="#" method="">
            <fieldset>
                <legend>Edit my Book</legend>
                <p class="field">
                    <label for="title">Title</label>
                    <span class="input">
                        <input type="text" name="title" id="title" value="${book.title}">
                    </span>
                </p>
                <p class="field">
                    <label for="description">Description</label>
                    <span class="input">
                        <textarea name="description" id="description">${book.description}</textarea>
                    </span>
                </p>
                <p class="field">
                    <label for="image">Image</label>
                    <span class="input">
                        <input type="text" name="imageUrl" id="image" value="${book.imageUrl}">
                    </span>
                </p>
                <p class="field">
                    <label for="type">Type</label>
                    <span class="input">
                        <select id="type" name="type" .value="${book.type}">
                            <option value="Fiction">Fiction</option>
                            <option value="Romance">Romance</option>
                            <option value="Mistery">Mistery</option>
                            <option value="Classic">Clasic</option>
                            <option value="Other">Other</option>
                        </select>
                    </span>
                </p>
                <input class="button submit" type="submit" value="Save">
            </fieldset>
        </form>
    </section>
`;

export const editView = (ctx) => {
    const bookId = ctx.params.id;

    const onSubmit = (ev) => {
        ev.preventDefault();

        let data = Object.fromEntries(new FormData(ev.currentTarget));

        const areFieldsEmpty = inputValidator(Object.values(data));

        if (areFieldsEmpty) {
            alertConsole.ALL_FIELDS_ARE_REQUIRED_MESSAGE();
            return;
        }

        requestService.editBook(bookId, data)
            .then(() => ctx.page.redirect(`/data/books/${bookId}`));
    }

    requestService.getBookById(bookId)
        .then(book => {
            ctx.render(editTemplate(book, onSubmit));
        });
}
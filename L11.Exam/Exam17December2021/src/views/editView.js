import { html } from '../../node_modules/lit-html/lit-html.js';

import { inputValidator } from '../validators/inputValidator.js';

import * as requestService from '../services/requesterService.js';

import { notificationHandler } from '../handlers/notificationHandler.js';
import { ALL_FIELDS_ARE_REQUIRED_ERROR } from '../messages/alertMessage.js';

const editTemplate = (meme, onSubmit) => html`
    <section id="edit-meme">
        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" value="${meme.title}">
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description"
                    .value="${meme.description}"></textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" value="${meme.imageUrl}">
                <input type="submit" class="registerbtn button" value="Edit Meme">
            </div>
        </form>
    </section>
`;

export const editView = (ctx) => {
    const memeId = ctx.params.id;

    const onSubmit = (ev) => {
        ev.preventDefault();

        const data = Object.fromEntries(new FormData(ev.currentTarget))

        try {
            const isInputValid = inputValidator(Object.values(data));

            if (!isInputValid) {
                ALL_FIELDS_ARE_REQUIRED_ERROR();
            }

            requestService.editMeme(memeId, data)
                .then(() => ctx.page.redirect(`/data/memes/${memeId}`))
                .catch(err => {
                    throw new Error(err);
                });

        } catch (error) {
            notificationHandler(error.message);
        }
    }

    requestService.memeDetails(memeId)
        .then(meme => ctx.render(editTemplate(meme, onSubmit)))
        .catch(err => notificationHandler(err));
}
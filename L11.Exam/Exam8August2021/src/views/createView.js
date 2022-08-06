import { html } from '../../node_modules/lit-html/lit-html.js';

import * as alertConsole from '../messages/alertMessages.js';
import * as requestService from '../services/requesterService.js';

import { inputValidator } from '../validators/inputValidator.js';

const createTemplate = (onSubmit) => html`
  <section id="create-page" class="create">
    <form id="create-form" action="" method="">
      <fieldset>
        <legend>Add new Book</legend>
        <p class="field">
          <label for="title">Title</label>
          <span class="input">
            <input type="text" name="title" id="title" placeholder="Title" />
          </span>
        </p>
        <p class="field">
          <label for="description">Description</label>
          <span class="input">
            <textarea
              name="description"
              id="description"
              placeholder="Description"
            ></textarea>
          </span>
        </p>
        <p class="field">
          <label for="image">Image</label>
          <span class="input">
            <input type="text" name="imageUrl" id="image" placeholder="Image" />
          </span>
        </p>
        <p class="field">
          <label for="type">Type</label>
          <span class="input">
            <select id="type" name="type">
              <option value="Fiction">Fiction</option>
              <option value="Romance">Romance</option>
              <option value="Mistery">Mistery</option>
              <option value="Classic">Clasic</option>
              <option value="Other">Other</option>
            </select>
          </span>
        </p>
        <input class="button submit" type="submit" value="Add Book" />
      </fieldset>
    </form>
  </section>
`;

export const createView = (ctx) => {
  const onSubmit = (ev) => {
    ev.preventDefault();

    let data = Object.fromEntries(new FormData(ev.currentTarget));

    const areFieldsEmpty = inputValidator(Object.values(data));

    if (areFieldsEmpty) {
      alertConsole.ALL_FIELDS_ARE_REQUIRED_MESSAGE();
      return;
    }

    requestService.createBook(data).then(() => ctx.page.redirect('/'));
  };

  ctx.render(createTemplate(onSubmit));
};

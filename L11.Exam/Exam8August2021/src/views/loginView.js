import { html } from '../../node_modules/lit-html/lit-html.js';

import { inputValidator } from '../validators/inputValidator.js';
import * as alertConsole from '../messages/alertMessages.js';
import * as requestService from '../services/requesterService.js';

const loginTemplate = (onSubmit) => html`
    <section id="login-page" class="login">
        <form @submit=${onSubmit} id="login-form" action="" method="">
            <fieldset>
                <legend>Login Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                        <input type="text" name="email" id="email" placeholder="Email">
                    </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                        <input type="password" name="password" id="password" placeholder="Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Login">
            </fieldset>
        </form>
    </section>
`;

export const loginView = (ctx) => {
    const onSubmit = (ev) => {
        ev.preventDefault();

        let { email, password } = Object.fromEntries(new FormData(ev.currentTarget));

        const areFieldsEmpty = inputValidator([email, password]);

        if (areFieldsEmpty) {
            alertConsole.ALL_FIELDS_ARE_REQUIRED_MESSAGE();
            return;
        }

        requestService.loginUser(email, password)
            .then(() => ctx.page.redirect('/'));
    }

    ctx.render(loginTemplate(onSubmit));
}
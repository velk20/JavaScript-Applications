import { html } from '../../node_modules/lit-html/lit-html.js';

import * as alertConsole from '../messages/alertMessages.js';
import * as requestService from '../services/requesterService.js';

import { inputValidator } from '../validators/inputValidator.js';
import { passwordValidator } from '../validators/passwordValidator.js';

const registerTemplate = (onSubmit) => html`
    <section id="register-page" class="register">
        <form @submit=${onSubmit} id="register-form" action="" method="">
            <fieldset>
                <legend>Register Form</legend>
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
                <p class="field">
                    <label for="repeat-pass">Repeat Password</label>
                    <span class="input">
                        <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Register">
            </fieldset>
        </form>
    </section>
`;

export const registerView = (ctx) => {
    const onSubmit = (ev) => {
        ev.preventDefault();

        let { email, password, ['confirm-pass']: confirmPass } = Object.fromEntries(new FormData(ev.currentTarget));

        const areFieldsEmpty = inputValidator([email, password, confirmPass]);

        if (areFieldsEmpty) {
            alertConsole.ALL_FIELDS_ARE_REQUIRED_MESSAGE();
            return;
        }

        const arePasswordsValid = passwordValidator(password, confirmPass);

        if (!arePasswordsValid) {
            alertConsole.PASSWORDS_MUST_MATCH_MESSAGE();
            return;
        }

        requestService.registerUser(email, password)
            .then(() => ctx.page.redirect('/'));
    }

    ctx.render(registerTemplate(onSubmit));
}
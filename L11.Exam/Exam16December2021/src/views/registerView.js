import { html } from '../../node_modules/lit-html/lit-html.js';

import { inputValidator } from '../validators/inputValidator.js';
import { passwordValidator } from '../validators/passwordValidator.js';

import * as alertConsole from '../messages/alertMessage.js';
import * as requestService from '../services/requesterService.js';

const registerTemplate = (onSubmit) => html`
    <section id="registerPage">
        <form @submit=${onSubmit} class="registerForm">
            <h2>Register</h2>
            <div class="on-dark">
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>
    
            <div class="on-dark">
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>
    
            <div class="on-dark">
                <label for="repeatPassword">Repeat Password:</label>
                <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
            </div>
    
            <button class="btn" type="submit">Register</button>
    
            <p class="field">
                <span>If you have profile click <a href="/login">here</a></span>
            </p>
        </form>
    </section>
`;

export const registerView = (ctx) => {
    const onSubmit = (ev) => {
        ev.preventDefault();

        const { email, password, repeatPassword } = Object.fromEntries(new FormData(ev.currentTarget));

        const isInputValid = inputValidator([email, password, repeatPassword]);

        if (!isInputValid) {
            alertConsole.ALL_FIELDS_ARE_REQUIRED_MESSAGE();
            return;
        }

        const isValidPass = passwordValidator(password, repeatPassword);

        if (!isValidPass) {
            alertConsole.PASSWORDS_MUST_MATCH_MESSAGE();
            return;
        }

        requestService.register(email, password)
            .then(() => ctx.page.redirect('/'));
    }

    ctx.render(registerTemplate(onSubmit));
}
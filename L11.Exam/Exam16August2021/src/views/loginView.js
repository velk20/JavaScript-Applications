import { html } from '../../node_modules/lit-html/lit-html.js';

import { inputValidator } from '../validators/inputValidator.js';
import * as alertConsole from '../messages/alertMessage.js';
import * as requestService from '../services/requesterService.js';

const loginTemplate = (onSubmit) => html`
    <section id="login-page" class="auth">
        <form @submit=${onSubmit} id="login">
            <div class="container">
                <div class="brand-logo"></div>
                <h1>Login</h1>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">
    
                <label for="login-pass">Password:</label>
                <input type="password" id="login-password" name="password">
                <input type="submit" class="btn submit" value="Login">
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </div>
        </form>
    </section>
`;

export const loginView = (ctx) => {
    const onSubmit = (ev) => {
        ev.preventDefault();

        const { email, password } = Object.fromEntries(new FormData(ev.currentTarget));

        const isInputValid = inputValidator([email, password]);

        if (!isInputValid) {
            alertConsole.ALL_FIELDS_ARE_REQUIRED_MESSAGE();
            return;
        }

        requestService.login(email, password)
            .then(() => ctx.page.redirect('/'));
    }

    ctx.render(loginTemplate(onSubmit));
}
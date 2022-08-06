import { html } from '../../node_modules/lit-html/lit-html.js';

import { inputValidator } from '../validators/inputValidator.js';
import { passwordValidator } from '../validators/passwordValidator.js';

import * as requestService from '../services/requesterService.js';
import { notificationHandler } from '../handlers/notificationHandler.js';
import { ALL_FIELDS_ARE_REQUIRED_ERROR, PASSWORDS_MUST_MATCH_ERROR } from '../messages/alertMessage.js';

const registerTemplate = (onSubmit) => html`
    <section id="register">
        <form @submit=${onSubmit} id="register-form">
            <div class="container">
                <h1>Register</h1>
                <label for="username">Username</label>
                <input id="username" type="text" placeholder="Enter Username" name="username">
                <label for="email">Email</label>
                <input id="email" type="text" placeholder="Enter Email" name="email">
                <label for="password">Password</label>
                <input id="password" type="password" placeholder="Enter Password" name="password">
                <label for="repeatPass">Repeat Password</label>
                <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                <div class="gender">
                    <input type="radio" name="gender" id="female" value="female">
                    <label for="female">Female</label>
                    <input type="radio" name="gender" id="male" value="male" checked>
                    <label for="male">Male</label>
                </div>
                <input type="submit" class="registerbtn button" value="Register">
                <div class="container signin">
                    <p>Already have an account?<a href="/login">Sign in</a>.</p>
                </div>
            </div>
        </form>
    </section>
`;

export const registerView = (ctx) => {
    const onSubmit = (ev) => {
        ev.preventDefault();

        const data = Object.fromEntries(new FormData(ev.currentTarget));

        try {
            const isInputValid = inputValidator(Object.values(data));

            if (!isInputValid) {
                ALL_FIELDS_ARE_REQUIRED_ERROR();
            }

            const isValidPass = passwordValidator(data.password, data.repeatPass);

            if (!isValidPass) {
                PASSWORDS_MUST_MATCH_ERROR();
            }

            requestService.register(data)
                .then(() => ctx.page.redirect('/catalog'))
                .catch(err => {
                    throw new Error(err);
                });

        } catch (error) {
            notificationHandler(error.message);
        }
    }

    ctx.render(registerTemplate(onSubmit));
}
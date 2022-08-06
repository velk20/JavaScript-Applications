import { html } from '../../node_modules/lit-html/lit-html.js';
import * as validator from '../validators/formValidator.js';
import * as requestService from '../services/requesterService.js';

const registerTemplate = (onSubmit) => html`    
    <section id="registerPage">
        <form @submit=${onSubmit}>
            <fieldset>
                <legend>Register</legend>
    
                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">
    
                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">
    
                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">
    
                <button type="submit" class="register">Register</button>
    
                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;

export const registerView = (ctx) => {
    const onSubmit = (ev) => {
        ev.preventDefault();

        const { email, password, ['conf-pass']: repass } = Object.fromEntries(new FormData(ev.currentTarget));
        const areFieldsValid = validator.formValidator(email, password, repass);

        if (!areFieldsValid) {
            alert('All fields are required!')
            return;
        }

        const isValidPass = validator.passwordValidator(password, repass);

        if (!isValidPass) {
            alert('Passwords must match!');
            return;
        }

        requestService.register(email, password)
            .then(() => ctx.page.redirect('/'))
            .catch(error => alert(error));
    }

    ctx.render(registerTemplate(onSubmit));
}
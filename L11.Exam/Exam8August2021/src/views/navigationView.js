import { html } from '../../node_modules/lit-html/lit-html.js';

const navigationTemplate = (user, ctx) => html`
    <nav class="navbar">
        <section class="navbar-dashboard">
            <a href="/">Dashboard</a>
            ${user ? userLinks(ctx) : guestLinks()}
        </section>
    </nav>
`;

const userLinks = (ctx) => html`
    <div id="user">
        <span>Welcome, ${ctx.user.email}</span>
        <a class="button" href="/data/books">My Books</a>
        <a class="button" href="/create">Add Book</a>
        <a class="button" href="/logout">Logout</a>
    </div>
`;

const guestLinks = () => html`
    <div id="guest">
        <a class="button" href="/login">Login</a>
        <a class="button" href="/register">Register</a>
    </div>
`;

export const navigationView = (ctx) => {
    return navigationTemplate(ctx.user, ctx);
}
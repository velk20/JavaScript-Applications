import { html, render } from 'lit-html';

const greetings = (name) => html`<h2>${name}</h2>`;
render(greetings, window);

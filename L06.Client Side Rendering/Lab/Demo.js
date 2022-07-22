import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { classMap } from '../../node_modules/lit-html/directives/class-map.js';

const greetings = (name) => html`<h2>${name}</h2>`;
render(greetings, window);

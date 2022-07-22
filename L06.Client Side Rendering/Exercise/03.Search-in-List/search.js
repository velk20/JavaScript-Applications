import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

let cardTemplate = html`
  <ul>
    ${towns.map((item) => {
      return html`<li id=${item}>${item}</li>`;
    })}
  </ul>
`;

let card = document.getElementById('towns');

render(cardTemplate, card);

function search() {
  // TODO
}

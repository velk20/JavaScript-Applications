import { html } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getAllCars } from '../data/cars';

const catalogTemplate = (recipes) => html` <h2>Catalog</h2>
  <ul>
    ${repeat(recipes, (r) => r._id, recipeCard)}
  </ul>`;

const recipeCard = (car) =>
  html`<li><a href="/catalog/${car._id}">${car.name}</a></li>`;

export async function showCatalog(ctx) {
  ctx.render(catalogTemplate([]));
  const recipes = await getAllCars();
  ctx.render(catalogTemplate(recipes));
}

import { render } from '../../node_modules/lit-html/lit-html.js';

const mainRoot = document.getElementById('main-content');

const renderContent = (template) => {
    render(template, mainRoot);
}

export const renderMiddleware = (ctx, next) => {
    ctx.render = renderContent;
    next();
}
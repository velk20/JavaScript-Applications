import { render } from '../../node_modules/lit-html/lit-html.js';

const mainRoot = document.querySelector('#main-content');

const renderContent = (templateResult) => {
    render(templateResult, mainRoot);
}

export const renderContentMiddleware = (ctx, next) => {
    ctx.render = renderContent;
    next();
}
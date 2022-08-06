export const loggedHandler = (ctx, next) => {
    ctx.user ? ctx.page.redirect('/catalog') : '';
    next();
}
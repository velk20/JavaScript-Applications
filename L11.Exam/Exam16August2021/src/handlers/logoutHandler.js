import * as requestService from '../services/requesterService.js';

export const logoutHandler = (ctx) => {
    requestService.logout()
        .then(() => ctx.page.redirect('/'));
}
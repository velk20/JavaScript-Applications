import * as requesterService from '../services/requesterService.js';

export const logoutView = (ctx) => {
    requesterService.logout()
        .then(() => ctx.page.redirect('/'));
}
import * as requestService from '../services/requesterService.js';
import * as alertConsole from '../messages/alertMessages.js';

export const deleteHandler = (ctx) => {
    const confirmed = alertConsole.CONFIRM_DELETE_BOOK_MESSAGE();

    if (confirmed) {
        requestService.deleteBookById(ctx.params.id)
            .then(ctx.page.redirect('/'));
    }
}
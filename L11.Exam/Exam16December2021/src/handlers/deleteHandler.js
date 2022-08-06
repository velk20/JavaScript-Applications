import * as requestService from '../services/requesterService.js';

import { DELETE_THEATER_CONFIRM_MESSAGE } from '../messages/confirmMessage.js';

export const deleteHandler = (ctx) => {
    const confirmed = DELETE_THEATER_CONFIRM_MESSAGE();

    if (confirmed) {
        const theaterId = ctx.params.id;

        requestService.deleteTheater(theaterId)
            .then(() => ctx.page.redirect('/profile'));
    }
}
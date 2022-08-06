import * as requestService from '../services/requesterService.js';
import { DELETE_GAME_CONFIRM_MESSAGE } from '../messages/alertMessage.js';

export const deleteHandler = (ctx) => {
    const confirmed = DELETE_GAME_CONFIRM_MESSAGE();

    if (confirmed) {
        const gameId = ctx.params.id;

        requestService.deleteGame(gameId)
            .then(() => ctx.page.redirect('/'));
    }
}
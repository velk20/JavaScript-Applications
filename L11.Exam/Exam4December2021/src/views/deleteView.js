import * as requestService from '../services/requesterService.js';

export const deleteView = (ctx) => {
    const comfirmed = confirm('Do you want to delete this album?');

    if (comfirmed) {
        requestService.removeAlbum(ctx.params.albumId)
            .then(() => ctx.page.redirect('/catalog'));
    }
}
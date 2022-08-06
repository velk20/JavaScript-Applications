import page from '../node_modules/page/page.mjs';

import { authMiddleware } from './middlewares/authMiddleware.js';
import { navigationMiddleware } from './middlewares/navigationMiddleware.js';
import { renderMiddleware } from './middlewares/renderMiddleware.js';

import { logoutHandler } from './handlers/logoutHandler.js';
import { deleteHandler } from './handlers/deleteHandler.js';

import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { registerView } from './views/registerView.js';
import { createView } from './views/createView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { profileView } from './views/profileView.js';

page(authMiddleware);
page(navigationMiddleware);
page(renderMiddleware);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutHandler);
page('/create', createView);
page('/profile', profileView);
page('/data/theaters/:id/edit', editView);
page('/data/theaters/:id/delete', deleteHandler);
page('/data/theaters/:id', detailsView);

page.start();
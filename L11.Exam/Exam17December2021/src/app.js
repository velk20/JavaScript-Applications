import page from '../node_modules/page/page.mjs';

import { authMiddleware } from './middlewares/authMiddleware.js';
import { navigationMiddleware } from './middlewares/navigationMiddleware.js';
import { renderMiddleware } from './middlewares/renderMiddleware.js';

import { logoutHandler } from './handlers/logoutHandler.js';
import { loggedHandler } from './handlers/loggedHandler.js';

import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { registerView } from './views/registerView.js';
import { createView } from './views/createView.js';
import { catalogView } from './views/catalogView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { userMemesView } from './views/userMemesView.js';

page(authMiddleware);
page(navigationMiddleware);
page(renderMiddleware);

page('/', loggedHandler, homeView);
page('/catalog', catalogView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutHandler);
page('/create', createView);
page('/data/memes/:id', detailsView);
page('/data/memes/:id/edit', editView);
page('/data/memes', userMemesView);

page.start();
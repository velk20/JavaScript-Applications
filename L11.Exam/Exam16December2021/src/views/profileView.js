import { html } from '../../node_modules/lit-html/lit-html.js';

import * as requestService from '../services/requesterService.js';

const profileTemplate = (user, theaters) => html`
    <section id="profilePage">
        <div class="userInfo">
            <div class="avatar">
                <img src="./images/profilePic.png">
            </div>
            <h2>${user.email}</h2>
        </div>
        <div class="board">
            ${theaters.length > 0
                ? theaters.map(theater => theaterTemplate(theater))
                :html`
                <div class="no-events">
                    <p>This user has no events yet!</p>
                </div>`
            }
        </div>
    </section>
`;

const theaterTemplate = (theater) => html`
    <div class="eventBoard">
        <div class="event-info">
            <img src="${theater.imageUrl}">
            <h2>${theater.title}</h2>
            <h6>${theater.date}</h6>
            <a href="/data/theaters/${theater._id}" class="details-button">Details</a>
        </div>
    </div>
`;

export const profileView = (ctx) => {
    const user = ctx.user;

    requestService.getListTheaters(user._id)
        .then(theaters => ctx.render(profileTemplate(user, theaters)));
}
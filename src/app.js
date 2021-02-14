"use strict";

import Home         from './views/pages/Home.js'
import Utils        from './services/Utils.js';
// List of supported routes.
const routes = {
    '/'             : Home
};

const router = async () => {

    // Lazy load view element:
    const content = null || document.getElementById('page_container');
    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    // Get the page from our hash of supported routes.
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();
  
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);

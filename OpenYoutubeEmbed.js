// ==UserScript==
// @name         Disable youtube clicks and open embed on new tab
// @namespace    http://tampermonkey.net/
// @version      2024-10-02
// @description  try to take over the world!
// @author       You
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("script ran");

    function redirectToEmbed(url) {
        // Check if it's a YouTube video URL and not already an embed
        if (url.includes('youtube.com/watch') && !url.includes('embed')) {
            const videoId = new URL(url).searchParams.get('v');
            if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                window.open(embedUrl, '_blank');
            }
        }
    }

    function handleClick(event) {
        // Check if the clicked element is a link (<a>) and it contains a YouTube video URL
        const link = event.target.closest('a[href*="/watch"]');
        if (link) {
            // Prevent the default navigation behavior
            event.preventDefault();
            event.stopImmediatePropagation();

            // Open the link in a new tab
            const url = link.href;
            console.log("Opening video in a new tab:", url);
            //window.open(url, '_blank'); // Open the link in a new tab
            redirectToEmbed(url);
        }
    }

    // Attach a click event listener to the entire document to capture clicks on all video links
    document.addEventListener('click', handleClick, true);

})();

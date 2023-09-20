// ==UserScript==
// @name         Steam Marketplace Linker For Badge Page
// @namespace    Steam Script
// @version      1.0
// @description  Adds a button to Steam badge page to link to game marketplace items.
// @author       R4r3s
// @match        https://steamcommunity.com/id/*/badges/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function extractGameIdFromUrl(url) {
        const match = url.match(/\/gamecards\/(\d+)\//);
        return match && match[1];
    }

    const badgeContainers = document.querySelectorAll('.badge_row');

    badgeContainers.forEach(badgeContainer => {
        const badgeLink = badgeContainer.querySelector('.badge_row_overlay');
        if (badgeLink) {
            const steamUrl = badgeLink.href;
            const gameId = extractGameIdFromUrl(steamUrl);

            if (gameId) {
                const marketplaceUrl = `https://steamcommunity.com/market/search?appid=753&category_753_Game[]=tag_app_${gameId}#p_price_desc`;
                const marketplaceButton = document.createElement('a');
                marketplaceButton.href = marketplaceUrl;
                marketplaceButton.className = 'btn_grey_black btn_medium';
                marketplaceButton.textContent = 'Go to Marketplace';

                // Open the link in a new page
                marketplaceButton.target = '_blank';

                // Center the button and increase font size
                marketplaceButton.style.display = 'inline-block';
                marketplaceButton.style.fontSize = '16px';

                // Insert the button before the badgeContainer itself
                badgeContainer.parentNode.insertBefore(marketplaceButton, badgeContainer);
            }
        }
    });
})();

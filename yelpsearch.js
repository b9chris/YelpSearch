function yelpSearch(info, tab) {
	chrome.tabs.create({
		url: 'http://www.yelp.com/search?find_desc=' + encodeURIComponent(info.selectionText)
	});
}

(function() {
	var id = chrome.contextMenus.create({
		title: 'Search Yelp for "%s"',
		contexts: ['selection'],
		onclick: yelpSearch
	});
})();



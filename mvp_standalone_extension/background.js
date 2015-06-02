console.log( 'Background.html starting!' );
	/*Send request to current tab when page action is clicked*/
	chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.getSelected(null, function(tab) {
			chrome.tabs.sendRequest(
				//Selected tab id
				tab.id,
				//Params inside a object data
				{callFunction: "toggleSidebar"}
			);
		});
	});
console.log( 'Background.html done.' );
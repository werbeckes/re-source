var test = chrome.contextMenus.create({"title": "Logout of Re:Source", "contexts":["browser_action"], "onclick": logout});

function logout() {
    chrome.storage.sync.set({"resource_user_token": "SucksToBeYou"}, function() {
      console.log("User Logged Out");
    });

}
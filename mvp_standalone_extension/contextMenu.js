var logout = chrome.contextMenus.create({"title": "Logout of Re:Source", "contexts":["browser_action"], "onclick": logout});

function logout() {
    chrome.storage.sync.set({"resource_user_token": "SucksToBeYou"}, function() {
      console.log("User Logged Out");
    });
}

// ============ video snippet saving

var videoSnippet = chrome.contextMenus.create({"title": "Send Youtube Video to Re: Source Snippet", "contexts":["page", "browser_action"], "onclick": snipVideo});

function snipVideo(event) {
 console.log(event);
 console.log("sending save message");

chrome.storage.sync.get("resource_user_token", function(response) {
    var user_token = response.resource_user_token;
    // THIS IS A CALL BACK FUNCTION
    // set params
    console.log(user_token);
    var params = {body: event.pageUrl, snippetUrl: event.pageUrl};
    console.log(params);
    // sendSaveRequest(user_token, params);

    console.log("rolling data into one request object");
    var request = {user_token: user_token, params: params}
    saveSnippet(request, "bob?" ,function(){});
    });
}

